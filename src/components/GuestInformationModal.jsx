import { Button, Card, Form, Input, Select, Col, Row, notification } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';
import JSONDATA from '../countryCode.json';
import { stripeCheckout } from '../middleware/BookingAPIs';
import { store } from '../store';
import { setSalutation, setFirstName, setLastName, setCountryCode, setPhoneNumber, setEmail, setSpecialRequest } from '../middleware/actions/'

// import { useSelector, useDispatch } from 'react-redux';
const {TextArea} = Input;
const { Option } = Select;
const openNotificationWithIcon = (placement) => {
    notification.error({
      message: `Error`,
      description:
        'Please fill in all required information.',
      placement,
    });
};

const GuestInformationModal = () => {
    const [form] = Form.useForm();

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    function onCaptcha(value) {
        console.log('Captcha value:', value);
      }
      
    const onSearch = (value) => {
        console.log('search:', value);
    };

    const onSalutationChange = (value) => {
        switch (value) {
          case 'Mr.':
            form.setFieldsValue({
              salutation: 'Mr.',
            });
            break;
    
          case 'Ms.':
            form.setFieldsValue({
              salutation: 'Ms.',
            });
            break;
    
          case 'Mrs.':
            form.setFieldsValue({
                salutation: 'Mrs.',
            });
            break;

          default:
            form.setFieldsValue({
                salutation: null,
            });
            break;
        }
    };

    async function onFinish (values) {
        if (validation(values)) {
            triggerNotif();
        } else {
            console.log(values);
            store.dispatch(setSalutation(values.salutation));
            store.dispatch(setFirstName(values.firstName));
            store.dispatch(setLastName(values.lastName));
            store.dispatch(setCountryCode(values.countryCode));
            store.dispatch(setPhoneNumber(values.phoneNumber));
            store.dispatch(setEmail(values.email));
            store.dispatch(setSpecialRequest(values.specialRequest));
            await stripeCheckout();
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFocus = event => {

        if(event.target.autocomplete)
        {
          event.target.autocomplete = "whatever";
        }
     
    };

    const triggerNotif = () => openNotificationWithIcon('bottomRight');

    function validation(values) {
        if (values.salutation == null || values.firstName == null || values.lastName == null|| values.countryCode == null|| values.phoneNumber == null|| values.email == null) {
            return true;
        }
        return false;
    }
     
    return (
        <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish} requiredMark="optional">
            <Row>
                <Col span={10} offset={7} style={{marginTop: 16, marginBottom: 16}}>
                    <Card title= {<h3> <b> Guest Information </b></h3>} style={{fontWeight: "bold"}} >
                        <Row>
                            <Col span={4} offset={0}>
                                <Form.Item name="salutation" label="Salutation" required>
                                    <Select onChange={onSalutationChange} allowClear>
                                        <Option value="Mr.">Mr.</Option>
                                        <Option value="Ms.">Ms.</Option>
                                        <Option value="Mrs.">Mrs.</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={9} offset={1}>
                                <Form.Item name="firstName" label="First Name" required>
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                            <Col span={9} offset={1}>
                                <Form.Item name="lastName" label="Last Name" required>
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={11} offset={0}>
                                <Form.Item name="countryCode" label="Country Code" required>
                                    <Select
                                        autoComplete="off" 
                                        onFocus={onFocus}
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        filterOption={(input, option) => option.children.join('').toLowerCase().includes(input.toLowerCase())}
                                    >
                                        {JSONDATA["countries"].map((item,i) => <Option key={i} value={item.name}> {item.name}: {item.code} </Option>)} 
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} offset={1}>
                                <Form.Item name="phoneNumber" label="Phone Number" required>
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} offset={0}>
                                <Form.Item name="email" label="Email" required>
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} offset={0}>
                                <Form.Item name="specialRequest" label="Special Request">
                                    <TextArea placeholder="Special requests cannot be guaranteed – but the property will do its best to meet your needs." rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>
                        
                    </Card>
                </Col>
                <Col span={4} offset={10} style={{marginTop: 12, marginBottom: 12}}>
                        <ReCAPTCHA
                            sitekey="6Led8p8gAAAAAArKHbSfNdm5eY_-WUul_86dCUbr"
                            onChange={onCaptcha}
                        />
                </Col>
                <Col span={4} offset={10} style={{marginTop: 12}}>
                    <Button onClick={onReset} type="default" shape="default" size="large" style={{borderRadius: 15, width:220}}>Reset Fields</Button>
                </Col>
                <Col span={4} offset={10} style={{marginTop: 16, marginBottom: 16}}>
                    <Button type="primary" shape="default" size="large" style={{borderRadius: 15, width:220}} htmlType="submit">Proceed for  Payment</Button>
                </Col>
            </Row>

        </Form>
    );
}

export default GuestInformationModal;
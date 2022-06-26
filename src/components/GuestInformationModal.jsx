import {Button, Card, Form, Input, Select, Col, Row} from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';
import JSONDATA from '../countryCode.json';
import { stripeCheckout } from '../api';

// import { useSelector, useDispatch } from 'react-redux';
const {TextArea} = Input;
const { Option } = Select;
const fakeData = {
    hotelName: "Fullerton Hotel Singapore",
    roomType: "Deluxe Plus",
    numberOfRoom: 2,
    numberOfAdult: 2,
    numberOfChildren: 2,
    checkinDate: "10/12/2022",
    checkoutDate: "11/12/2022",
    totalCost: 12.40
}

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
            return;
    
          case 'Ms.':
            form.setFieldsValue({
              salutation: 'Ms.',
            });
            return;
    
          case 'Mrs':
            form.setFieldsValue({
                salutation: 'Mrs.',
            });
        }
    };

    const onFinish = (values) => {
        console.log(values);
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

    return (
        <Row>
            <Col span={10} offset={7} style={{marginTop: 16, marginBottom: 16}}>
                <Card title= {<h3> <b> Booking Summary</b></h3>} >
                    <div style={{textAlign: "left"}}>
                        <Row>
                            <span style={{display:"block", fontWeight: "bold",fontSize: "large"}}>{fakeData.hotelName}</span>
                        </Row>
                        <Row>
                            <span style={{display:"block", fontWeight: "bold",fontSize: "medium"}}>{fakeData.roomType}</span>
                        </Row>
                        <Row>
                            <p style={{display:"block", fontWeight: "bold",fontSize: "medium"}}>${fakeData.totalCost.toFixed(2)}</p>
                        </Row>
                        <Row>
                            <Col span={7} offset={0}>
                                <p> <b>Number of Room :</b> {fakeData.numberOfRoom}</p>
                            </Col>
                            <Col span={7} offset={1}>
                                <p><b>Number of Adult:</b> {fakeData.numberOfAdult}</p>
                            </Col>
                            <Col span={7} offset={1}>
                                <p><b>Number of Children:</b> {fakeData.numberOfChildren}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7} offset={0}>
                                <p><b>Check-in Date:</b> {fakeData.checkinDate}</p>
                            </Col>
                            <Col span={7} offset={1}>
                                <p><b>Checkout-out Date:</b> {fakeData.checkoutDate}</p>
                            </Col>
                        </Row>

                    </div>
                </Card>
            </Col>
            <Col span={10} offset={7} style={{marginTop: 16, marginBottom: 16}}>
                <Card title= {<h3> <b> Guest Information </b></h3>} style={{fontWeight: "bold"}} >
                    <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish} requiredMark="optional">
                        <Row>
                            <Col span={4} offset={0}>
                                <Form.Item name="salutation" label="Salutation" required>
                                    <Select placeholder="" onChange={onSalutationChange} allowClear>
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
                    </Form>
                </Card>
            </Col>
            <Col span={4} offset={10} style={{marginTop: 16, marginBottom: 16}}>
                    <ReCAPTCHA
                        sitekey="6Led8p8gAAAAAArKHbSfNdm5eY_-WUul_86dCUbr"
                        onChange={onCaptcha}
                    />
            </Col>
            <Col span={4} offset={10} style={{marginTop: 16, marginBottom: 16}}>
                <Button onClick={stripeCheckout} type="primary" shape="default" size="large" style={{borderRadius: 15}} htmlType="submit">Proceed for  Payment</Button>
            </Col>
        </Row>
    );
}

export default GuestInformationModal;
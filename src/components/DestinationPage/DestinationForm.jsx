import { DatePicker, Button, Card, Form, Select, Col, Row, notification, Spin } from 'antd';
import { useMemo, useRef, useState } from 'react';
import moment from 'moment';
import { store } from '../../store';
import debounce from 'lodash/debounce';
import  { setDest, setStartDate, setEndDate, setNumOfRoom, setNumOfAdult, setNumOfChild } from '../../middleware/ReduxActions'

const { Option } = Select;
const { RangePicker } = DatePicker;

const openNotificationWithIcon = (placement) => {
    notification.error({
      message: `Incomplete`,
      description:
        'Please fill in all required information.',
      placement,
    });
};
  
const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
};

const DestinationForm = ({onSubmit}) => {
    const [destination, setDestination] = useState('Destination or Hotel');

    const [form] = Form.useForm();
    const [value, setValue] = useState([]);

    const onFinish = (values) => {
        values.destination = store.getState().destinationID;
        if (validation(values)) {
             triggerNotif();
         } else {;
            //local storage
            const destinationData = new Object();
            destinationData.destination = destination;
            destinationData.checkInDate = values.date[0].format("YYYY-MM-DD");
            destinationData.checkOutDate = values.date[1].format("YYYY-MM-DD");
            destinationData.rooms = values.numberOfRoom;
            destinationData.adults = values.numberOfAdult;
            const total = parseInt(values.numberOfAdult) + parseInt(values.numberOfChild)
            if (values.numberOfRoom==1) {
                destinationData.guestNumber = `${total}`
            } else if (values.numberOfRoom==2) {
                destinationData.guestNumber = `${total}|${total}`
            } else if (values.numberOfRoom==3) {
                destinationData.guestNumber = `${total}|${total}|${total}`
            } else {
                destinationData.guestNumber = `${total}|${total}|${total}|${total}`
            }
            destinationData.children = values.numberOfChild;
            //redux
            store.dispatch(setStartDate(values.date[0].format("YYYY-MM-DD")));
            store.dispatch(setEndDate(values.date[1].format("YYYY-MM-DD")));
            store.dispatch(setNumOfRoom(values.numberOfRoom));
            store.dispatch(setNumOfAdult(values.numberOfAdult));
            store.dispatch(setNumOfChild(values.numberOfChild));
            onSubmit(destinationData);
        }
    };

    const triggerNotif = () => openNotificationWithIcon('bottomRight');

    function validation(values) {
        if (values.destination == null || values.date == null | values.numberOfRoom == null|| values.numberOfChild == null|| values.numberOfAdult == null) {
            return true;
        }
        return false;
    }

    async function fetchDestination(search) {
        search = search.replace(" ", "%20")
        return fetch('https://fluffy-granita-fe4f3b.netlify.app/apis/destination/' + search)
          .then((response) => response.json())
          .then((body) =>
            body.map((destination) => ({
              label: `${destination.term}`,
              key: destination._id,
              value: destination.uid,
            })),
          );
    }

    function DebounceSelect({ fetchOptions, debounceTimeout = 200, ...props }) { //put 200 during production
        const [fetching, setFetching] = useState(false);
        const [options, setOptions] = useState([]);
        const fetchRef = useRef(0);
        const debounceFetcher = useMemo(() => {
          const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
              if (fetchId !== fetchRef.current) {
                // for fetch callback order
                return;
              }
      
              setOptions(newOptions);
              setFetching(false);
            });
          };
      
          return debounce(loadOptions, debounceTimeout);
        }, [fetchOptions, debounceTimeout]);
        return (
          <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
          />
        );
      }

    return (
        <Card style={{borderRadius:5, padding:"10px 5px", width:"40%"}}>
            <Form layout="vertical" form={form} onFinish={onFinish} requiredMark="optional">
                <Row>
                    <Col span={24}>
                    <span style={{display:"block", fontWeight: "bold", marginBottom:6, textAlign: "left"}}>DESTINATION</span>
                        <Form.Item name="destination" required>
                            <DebounceSelect
                                showSearch
                                showArrow={false}
                                value={value}
                                placeholder="City / Country"
                                fetchOptions={fetchDestination}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                    store.dispatch(setDest(newValue.value));
                                    setDestination(newValue.value);
                                }}
                                style={{
                                    width: '100%',
                                    textAlign: 'left'
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <span style={{display:"block", fontWeight: "bold", marginBottom:6, textAlign: "left"}}>CHECK-IN / CHECK-OUT DATE</span>

                        <Form.Item name="date" required>
                            <RangePicker disabledDate={disabledDate} style={{width: '100%', fontWeight: "bold"}} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={8} offset={0}>
                        <span style={{display:"block", fontWeight: "bold", marginBottom:6, textAlign: "left"}}>ROOMS</span>
                        <Form.Item name="numberOfRoom" required>
                            <Select style={{width: '100%'}}>
                                <Option value="1">1 Room</Option>
                                <Option value="2">2 Room</Option>
                                <Option value="3">3 Room</Option>
                                <Option value="4">4 Room</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7} offset={1}>
                        <span style={{display:"block", fontWeight: "bold", marginBottom:6, textAlign: "left"}}>ADULTS</span>
                        <Form.Item name="numberOfAdult" required>
                            <Select style={{width: '100%'}}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7} offset={1}>
                        <span style={{display:"block", fontWeight: "bold", marginBottom:6, textAlign: "left"}}>CHILDREN</span>
                        <Form.Item name="numberOfChild" required>
                            <Select style={{width: '100%'}}>
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{marginTop: 2}}>
                        <Button type="primary" shape="default" size="large" htmlType="submit" style={{width: "100%"}}>Search Hotel</Button>
                    </Col>
                </Row>
                </Form>
        </Card>
    )

}

export default DestinationForm;
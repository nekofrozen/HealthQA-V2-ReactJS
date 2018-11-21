import React, { Component } from 'react';
import { Tabs, Button, Spin } from 'antd';
import { Table } from 'reactstrap';
import './admin.css';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { getUsers } from '../util/APIUtils';
import { Card, CardBody } from 'reactstrap';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import SignupAdmin from './signup/SignupAdmin';
import SignupDoctor from './signup/SignupDoctor';

const TabPane = Tabs.TabPane;

class ManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: [],
            doctor: [],
            isLoading: false,
            error: null,
            ModalText: 'ท่านต้องการลบคำถามนี้ใช่หรือไม่ ?',
            ModalVisible: false,
            confirmLoading: false,
            topicId: null,
            commentId: null,
            isTopic: null,
            isDoctor: null,
        }
    }
    componentDidMount() {
        this.handleLoadData();
    }

    handleLoadData = () => {
        this.setState({
            isLoading: true
        });

        getUsers()
            .then(response => {
                console.log(response)
                this.setState({
                    admin: response.admin,
                    doctor: response.doctor,
                    isLoading: false
                });
            }).catch(error => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
            });
    }

    handleTopicViewButton = (e) => {
        this.props.history.push("/topic/" + e);
    }

    handleTopicDeleteButton = (e) => {
        console.log(e)
        // this.props.history.push("/topic/" + e);
    }

    handleCommentDeleteButton = (e) => {
        console.log(e)
        // this.props.history.push("/topic/" + e);
    }
    toggleDoctor = () => {
        this.setState({
            modal: !this.state.modal,
            isDoctor: true
        });
    }

    toggleAdmin = () => {
        this.setState({
            modal: !this.state.modal,
            isDoctor: false
        });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            isDoctor: null
        });
    }

    render() {
        const { error } = this.state;
        if (this.state.notFound) {
            return <NotFound />;
        }

        if (this.state.serverError) {
            return <ServerError />;
        }

        if (error) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h1>We're sorry, but {error.message || "Something went wrong. Please try again!"}</h1>
                    <p>If you are the application owner check the logs for more information.</p>
                </div>
            );
        }


        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <Card outline color="danger">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        {this.state.isDoctor ? <SignupDoctor /> : <SignupAdmin />}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <CardBody>
                    <div className="profile">
                        <Spin spinning={this.state.isLoading} size="large" delay={200}>
                            <div className="user-poll-details">
                                <Tabs defaultActiveKey="1"
                                    animated={false}
                                    tabBarStyle={tabBarStyle}
                                    size="large"
                                    className="profile-tabs">
                                    <TabPane tab="หมอ" key="1">
                                        <div className="mb-2">
                                            <Button type="primary" onClick={this.toggleDoctor} ghost icon="user-add">เพิ่มผู้ใช้งาน</Button>
                                        </div>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>User ID</th>
                                                    <th>Firstname</th>
                                                    <th>Lastname</th>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.doctor.map(
                                                        (doctor, index) =>
                                                            <tr key={index}>
                                                                <th scope="row">{doctor.id}</th>
                                                                <td>{doctor.firstName}</td>
                                                                <td>{doctor.lastName}</td>
                                                                <td>{doctor.username}</td>
                                                                <td>{doctor.email}</td>
                                                                <td style={{ width: '100px' }}>
                                                                    <div>
                                                                        <Button
                                                                            type="danger"
                                                                            ghost
                                                                            className="ml-2"
                                                                            shape="circle"
                                                                            icon="delete"
                                                                            onClick={(e) => this.handleTopicDeleteButton(doctor.id)} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                    <TabPane tab="ผู้ดูแลระบบ" key="2">
                                        <div className="mb-2">
                                            <Button type="primary" onClick={this.toggleAdmin} ghost icon="user-add">เพิ่มผู้ใช้งาน</Button>
                                        </div>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>User ID</th>
                                                    <th>Firstname</th>
                                                    <th>Lastname</th>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.admin.map(
                                                        (admin, index) =>
                                                            <tr key={index}>
                                                                <th scope="row">{admin.id}</th>
                                                                <td>{admin.firstName}</td>
                                                                <td>{admin.lastName}</td>
                                                                <td>{admin.username}</td>
                                                                <td>{admin.email}</td>
                                                                <td style={{ width: '100px' }}>
                                                                    <div>
                                                                        <Button
                                                                            type="danger"
                                                                            ghost
                                                                            className="ml-2"
                                                                            shape="circle"
                                                                            icon="delete"
                                                                            onClick={(e) => this.handleTopicDeleteButton(admin.id)} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Spin>
                    </div>
                </CardBody>
            </Card >
        );
    }
}

export default ManageUsers;
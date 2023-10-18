"use client"

import CustomLink from "@/components/CustomLink"
import { Button, Col, Form, Input, Row, Space } from "antd"
import { signIn } from "next-auth/react"
import Image from "next/image"
import HptBackground from "../../../public/img/HptBackground.png"
import Title from "antd/es/skeleton/Title"
import { useState } from "react"

type FieldType = {
    username: string
    password: string
}

const SigninForm = () => {
    //const router = useRouter()
    const [error, setError] = useState('')
    const onFinish = async (values: any) => {
        await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: true,
            callbackUrl: "http://localhost:3000"
        })
        /*  if (signInResponse) {
            if (signInResponse.ok) {
                console.log("Success", signInResponse)
            } else console.log(signInResponse)
        } */
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo)
        setError(errorInfo)
    }

    return (
        // <div>
        //     <Form
        //         name="basic"
        //         labelCol={{ span: 8 }}
        //         wrapperCol={{ span: 16 }}
        //         style={{ maxWidth: 600 }}
        //         initialValues={{ remember: true }}
        //         onFinish={onFinish}
        //         onFinishFailed={onFinishFailed}
        //         autoComplete="off"
        //     >
        //         <Form.Item<FieldType>
        //             label="Username"
        //             name="username"
        //             rules={[{ required: true }]}
        //         >
        //             <Input />
        //         </Form.Item>

        //         <Form.Item<FieldType>
        //             label="Password"
        //             name="password"
        //             rules={[{ required: true }]}
        //         >
        //             <Input.Password />
        //         </Form.Item>

        //         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        //             <Button
        //                 type="primary"
        //                 className="bg-blue-500"
        //                 htmlType="submit"
        //             >
        //                 Submit
        //             </Button>
        //             {typeof window !== "undefined" && (
        //                 <CustomLink href={window.location.origin + "/register"}>
        //                     New user? Register heres
        //                 </CustomLink>
        //             )}
        //             <h1>Or</h1>
        //         </Form.Item>
        //     </Form>
        //     {/*  {props.providers &&
        //         Object.values(props.providers).map((provider: any) => {
        //             console.log("Provider", provider)
        //             return (
        //                 <div key={provider.name} style={{ marginBottom: 0 }}>
        //                     <button
        //                         onClick={() =>
        //                             signIn(provider.id, {
        //                                 callbackUrl: window.location.origin
        //                             })
        //                         }
        //                     >
        //                         Sign in with {provider.name}
        //                     </button>
        //                 </div>
        //             )
        //         })} */}
        // </div>
        <Row
            style={{
                backgroundImage: `url(/img/HptBackground.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "rgba(228, 240, 244, 1)",
                height: "100vh",
                width: "100vw",
                justifyContent: "left",
                alignItems: "center"
            }}
        >
            <Col lg={2} md={24}></Col>
            <Col lg={7} md={24}>
                <div
                    style={{
                        border: "70px solid rgba(255, 255, 255, 0.5)",
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        borderRadius: 20
                    }}
                >
                    <h3
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            color: "rgb(21,92,209)",
                            fontSize: "36px",
                            fontWeight: "bold",
                            textAlign:'center',
                            alignItems: "center",
                            height:'10vh'
                        }}
                    >
                        Đăng nhập
                    </h3>
                    
                    <Form
                        name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <b>Email</b>
                        <Form.Item<FieldType>
                            // label="Username"
                            name="username"
                            rules={[{ required: true }]}
                        >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                        <b>Password</b>
                        <Form.Item<FieldType>
                            // label="Password"
                            name="password"
                            rules={[{ required: true }]}
                        >
                            <Input.Password style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                className="bg-blue-500"
                                htmlType="submit"
                                style={{width:'100%'}}
                            >
                                Chuyên viên đăng nhập
                            </Button>

                        </Form.Item>
                        <br/>
                        <div style={{color:'red'}}>{error}</div>
                    </Form>
                </div>
            </Col>
        </Row>
    )
}

export default SigninForm

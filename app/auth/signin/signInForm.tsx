"use client"

import {
    faEye,
    faEyeSlash,
    faLock,
    faUser
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Flex, Form, Input, Row, Spin, theme } from "antd"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import "./styles.css"

type FieldType = {
    username: string
    password: string
}

const SigninForm = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const params = useSearchParams()
    const {
        token: { colorPrimary }
    } = theme.useToken()
    const onFinish = async (values: any) => {
        setError("")
        setLoading(true)
        const signInResponse = await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false
            //callbackUrl: process.env.NEXT_PUBLIC_SERVER_URL! + "/bu"
        })
        if (signInResponse?.error) {
            if (signInResponse.status !== 401) {
                setError(signInResponse?.error)
            } else {
                setError("Sai username hoặc mật khẩu")
            }
            setLoading(false)
        } else {
            const callBackURL = params.get("callbackUrl")
            if (callBackURL) {
                router.replace(callBackURL)
            } else {
                router.replace("/")
            }
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo)
        //setError(errorInfo)
    }

    return (
        <div className="h-2/3 w-full">
            <Row
                style={{
                    backgroundImage: `url(/img/background.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "100vh",
                    width: "100vw",
                    justifyContent: "center",
                    alignItems: "center"
                    //zIndex: 1
                }}
            >
                <Col xxl={5} xl={7} lg={7} md={7}>
                    <Flex
                        vertical
                        justify="space-between"
                        style={{
                            borderStyle: "solid",
                            borderWidth: "40px",
                            borderColor: "transparent",
                            backgroundColor: "rgb(160 210 255 / 73%)",
                            borderRadius: 20
                        }}
                        gap={10}
                    >
                        <div>
                            <center>
                                <Image
                                    width={150}
                                    height={150}
                                    src={"/img/login.png"}
                                    alt={"icon"}
                                />
                                {/*  <p
                                    className="text-3xl font-bold"
                                    style={{ color: colorPrimary }}
                                >
                                    Đăng nhập
                                </p> */}
                            </center>
                        </div>
                        <Form
                            name="basic"
                            // labelCol={{ span: 8 }}
                            // wrapperCol={{ span: 16 }}
                            style={{ marginTop: "20px" }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <div className="border-b-2 border-white mb-10">
                                <Form.Item<FieldType>
                                    // label="Username"
                                    name="username"
                                    rules={[{ required: true }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        className="placeholder-red-300"
                                        data-testid="usernameId"
                                        prefix={
                                            <FontAwesomeIcon
                                                icon={faUser}
                                                color="white"
                                            />
                                        }
                                        style={{ width: "100%" }}
                                        bordered={false}
                                        placeholder="Tên đăng nhập"
                                    />
                                </Form.Item>
                            </div>
                            <div className="border-b-2 border-white mb-10">
                                <Form.Item<FieldType>
                                    // label="Password"
                                    name="password"
                                    rules={[{ required: true }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input.Password
                                        data-testid="passwordId"
                                        prefix={
                                            <FontAwesomeIcon
                                                icon={faLock}
                                                color="white"
                                            />
                                        }
                                        style={{ width: "100%" }}
                                        bordered={false}
                                        iconRender={(visible) =>
                                            visible ? (
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    color="white"
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faEyeSlash}
                                                    color="white"
                                                />
                                            )
                                        }
                                        placeholder="Mật khẩu"
                                    />
                                </Form.Item>
                            </div>
                            {loading ? (
                                <center>
                                    <Spin />
                                </center>
                            ) : (
                                <Form.Item>
                                    <Button
                                        id="submitSignin"
                                        role="submitSignin"
                                        type="primary"
                                        className="bg-blue-500"
                                        htmlType="submit"
                                        style={{
                                            width: "100%",
                                            backgroundColor: "#141ED2"
                                        }}
                                        //onClick={() => form.submit()}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Form.Item>
                            )}
                            <center>
                                <div role="errorText" className="text-red-800">
                                    {error}
                                </div>
                            </center>
                        </Form>
                        {/* <center>
                            <p className="text-black text-xs/8">
                                © 2023. All Rights Reserved. Một sản phẩm của
                                HPT
                            </p>
                        </center> */}
                    </Flex>
                </Col>
            </Row>
        </div>
    )
}

export default SigninForm

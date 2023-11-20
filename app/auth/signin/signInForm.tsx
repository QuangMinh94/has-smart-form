"use client"

import {
    faEye,
    faEyeSlash,
    faLock,
    faUser
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Flex, Form, Input, Row, Spin } from "antd"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type FieldType = {
    username: string
    password: string
}

const SigninForm = () => {
    //const router = useRouter()
    const [userNameTitle, setUserNameTitle] = useState<boolean>(false)
    const [passwordTitle, setPasswordTitle] = useState<boolean>(false)
    const [error, setError] = useState("")
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
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
        }
    }

    useEffect(() => {
        if (session) {
            const role = session.user.role
            router.replace(`/${role.toString().toLowerCase()}`)
        }
    }, [session])

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo)
        setError(errorInfo)
    }

    return (
        <div className="h-2/3 w-full">
            <Row
                style={{
                    backgroundImage: `url(/img/background.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    //backgroundColor: "rgba(228, 240, 244, 1)",
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
                            //border: "70px solid thin rgba(190, 220, 247, 0.65)",
                            borderStyle: "solid",
                            borderWidth: "40px",
                            borderColor: "transparent",
                            //color: "rgba(190, 220, 247, 0.65)",
                            //color: "#BEDCF7A6",
                            backgroundColor: "#BEDCF7A6",
                            borderRadius: 20
                        }}
                        gap={10}
                    >
                        <div>
                            <center>
                                <Image
                                    width={80}
                                    height={80}
                                    src={"/img/hptIconKnowingIT.png"}
                                    alt={"hpticon"}
                                />
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
                                {/*  {userNameTitle && <b>Tên đăng nhập</b>} */}
                                <Form.Item<FieldType>
                                    // label="Username"
                                    name="username"
                                    rules={[{ required: true }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        prefix={
                                            <FontAwesomeIcon
                                                icon={faUser}
                                                color="white"
                                            />
                                        }
                                        style={{ width: "100%" }}
                                        bordered={false}
                                        onFocus={() => setUserNameTitle(true)}
                                        onBlur={() => setUserNameTitle(false)}
                                        placeholder="Tên đăng nhập"
                                    />
                                </Form.Item>
                            </div>
                            <div className="border-b-2 border-white mb-10">
                                {/* {passwordTitle && <b>Mật khẩu</b>} */}
                                <Form.Item<FieldType>
                                    // label="Password"
                                    name="password"
                                    rules={[{ required: true }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input.Password
                                        prefix={
                                            <FontAwesomeIcon
                                                icon={faLock}
                                                color="white"
                                            />
                                        }
                                        style={{ width: "100%" }}
                                        bordered={false}
                                        onFocus={() => setPasswordTitle(true)}
                                        onBlur={() => setPasswordTitle(false)}
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
                                        type="primary"
                                        className="bg-blue-500"
                                        htmlType="submit"
                                        style={{
                                            width: "100%"
                                        }}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Form.Item>
                            )}
                            <center>
                                <div className="text-red-800">{error}</div>
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

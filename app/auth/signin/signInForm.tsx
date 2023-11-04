"use client"

import { Permission } from "@/app/(types)/Permission"
import { Users } from "@/app/(types)/Users"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { Button, Col, Flex, Form, Input, Row } from "antd"
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
    const [error, setError] = useState("")
    const { data: session } = useSession()
    const router = useRouter()
    const onFinish = async (values: any) => {
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
        }
    }

    useEffect(() => {
        if (session) {
            const userInfo = session.user.userInfo as Users
            const permission = userInfo.permission as Permission[]
            if (FindPermission(permission, "children", "VisibleBU")) {
                router.replace("/bu/mywork")
            } else if (
                FindPermission(permission, "children", "VisibleTeller")
            ) {
                router.replace("/teller")
            } else {
                router.replace("/bu/mywork")
            }
        }
    }, [session])

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo)
        setError(errorInfo)
    }

    return (
        <div className="h-full w-full">
            {/*  <Image
                className="z-0 object-cover bg-inherit"
                fill
                //preview={false}
                quality={100}
                src="/img/background.png"
                alt={"Some image"}
                //fallback="data:image/png;base64,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"
            /> */}

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
                            borderWidth: "60px",
                            borderColor: "transparent",
                            //color: "rgba(190, 220, 247, 0.65)",
                            //color: "#BEDCF7A6",
                            backgroundColor: "#BEDCF7A6",
                            borderRadius: 20
                        }}
                        gap={20}
                    >
                        <center>
                            <Image
                                width={60}
                                height={60}
                                src={"/img/hptIconKnowingIT.png"}
                                alt={"hpticon"}
                            />
                        </center>
                        <h3
                            style={{
                                color: "rgb(21,92,209)",
                                fontSize: "36px",
                                fontWeight: "bold",
                                textAlign: "center",
                                alignItems: "center",
                                height: "10vh"
                            }}
                        >
                            Đăng nhập
                        </h3>

                        <Form
                            name="basic"
                            // labelCol={{ span: 8 }}
                            // wrapperCol={{ span: 16 }}

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
                                    style={{ width: "100%" }}
                                >
                                    Chuyên viên đăng nhập
                                </Button>
                            </Form.Item>
                            <br />
                            <center>
                                <div className="text-red-600">{error}</div>
                            </center>
                        </Form>
                        <center>
                            <p className="text-black text-xs/8">
                                © 2023. All Rights Reserved. Một sản phẩm của
                                HPT
                            </p>
                        </center>
                    </Flex>
                </Col>
            </Row>
        </div>
    )
}

export default SigninForm

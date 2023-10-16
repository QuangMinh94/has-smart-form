"use client"

import CustomLink from "@/components/CustomLink"
import { Button, Form, Input } from "antd"
import { signIn } from "next-auth/react"

type FieldType = {
    username: string
    password: string
}

const SigninForm = () => {
    //const router = useRouter()
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
    }

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        className="bg-blue-500"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                    {typeof window !== "undefined" && (
                        <CustomLink href={window.location.origin + "/register"}>
                            New user? Register here
                        </CustomLink>
                    )}
                    <h1>Or</h1>
                </Form.Item>
            </Form>
            {/*  {props.providers &&
                Object.values(props.providers).map((provider: any) => {
                    console.log("Provider", provider)
                    return (
                        <div key={provider.name} style={{ marginBottom: 0 }}>
                            <button
                                onClick={() =>
                                    signIn(provider.id, {
                                        callbackUrl: window.location.origin
                                    })
                                }
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    )
                })} */}
        </div>
    )
}

export default SigninForm

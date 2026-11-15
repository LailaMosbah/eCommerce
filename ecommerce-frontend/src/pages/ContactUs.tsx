import { useState } from "react";
import { Button, Typography, Input, Form, message } from "antd";

// Styles
import styles from "./styles/contact.module.css";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const contactInfo = [
    {
        icon: "✉",
        label: "Email us",
        value: "hello@styled.com",
        href: "mailto:hello@styled.com",
    },
    {
        icon: "☏",
        label: "Call us",
        value: "+1 (555) 123-4567",
        href: "tel:+15551234567",
    },
    {
        icon: "⌂",
        label: "Visit us",
        value: "123 Fashion Ave, New York, NY",
        href: "#",
    },
];

export default function ContactUs() {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    const onFinish = async (values: { name: string; email: string; message: string }) => {
        setSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setSubmitting(false);
        message.success("Thanks! We'll get back to you within 24 hours.");
        form.resetFields();
    };

    return (
        <div className={styles.contact}>
            {/* Hero */}
            <section className={styles["contact__hero"]}>
                <Text className={styles["contact__eyebrow"]}>GET IN TOUCH</Text>
                <Title level={1} className={styles["contact__title"]}>
                    We'd love to
                    <br />
                    <span>hear from you.</span>
                </Title>
                <Paragraph className={styles["contact__description"]}>
                    Whether you have a question about sizing, need help with an
                    order, or just want to say hello — our team is here for you.
                </Paragraph>
            </section>

            {/* Main grid: info + form */}
            <section className={styles["contact__main"]}>
                {/* Contact Info */}
                <aside className={styles["contact__info"]}>
                    {contactInfo.map((item, index) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={styles["contact__info-card"]}
                            style={{ animationDelay: `${index * 0.12}s` }}
                        >
                            <span className={styles["contact__info-icon"]} aria-hidden="true">
                                {item.icon}
                            </span>
                            <div>
                                <Text className={styles["contact__info-label"]}>{item.label}</Text>
                                <Text className={styles["contact__info-value"]}>{item.value}</Text>
                            </div>
                        </a>
                    ))}

                    <div className={styles["contact__hours"]}>
                        <Text className={styles["contact__hours-title"]}>Opening Hours</Text>
                        <div className={styles["contact__hours-row"]}>
                            <Text className={styles["contact__hours-day"]}>Mon – Fri</Text>
                            <Text className={styles["contact__hours-time"]}>9:00 – 18:00</Text>
                        </div>
                        <div className={styles["contact__hours-row"]}>
                            <Text className={styles["contact__hours-day"]}>Sat – Sun</Text>
                            <Text className={styles["contact__hours-time"]}>10:00 – 16:00</Text>
                        </div>
                    </div>
                </aside>

                {/* Form */}
                <div className={styles["contact__form-wrapper"]}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                        className={styles["contact__form"]}
                    >
                        <div className={styles["contact__form-row"]}>
                            <Form.Item
                                label="Your Name"
                                name="name"
                                rules={[{ required: true, message: "Please enter your name" }]}
                            >
                                <Input size="large" placeholder="Jane Doe" className={styles["contact__input"]} />
                            </Form.Item>

                            <Form.Item
                                label="Email Address"
                                name="email"
                                rules={[
                                    { required: true, message: "Please enter your email" },
                                    { type: "email", message: "Please enter a valid email" },
                                ]}
                            >
                                <Input size="large" placeholder="jane@example.com" className={styles["contact__input"]} />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Message"
                            name="message"
                            rules={[{ required: true, message: "Please tell us how we can help" }]}
                        >
                            <TextArea
                                rows={6}
                                placeholder="Tell us how we can help..."
                                className={styles["contact__textarea"]}
                            />
                        </Form.Item>

                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            loading={submitting}
                            className={styles["contact__submit"]}
                            block
                        >
                            Send Message
                            <span aria-hidden="true"> →</span>
                        </Button>
                    </Form>
                </div>
            </section>

            {/* FAQ teaser */}
            <section className={styles["contact__faq"]}>
                <Title level={3} className={styles["contact__faq-title"]}>
                    Quick answers
                </Title>
                <div className={styles["contact__faq-grid"]}>
                    <div className={styles["contact__faq-item"]}>
                        <Text className={styles["contact__faq-q"]}>How long does shipping take?</Text>
                        <Text className={styles["contact__faq-a"]}>
                            Standard shipping arrives in 3–5 business days. Express options are
                            available at checkout.
                        </Text>
                    </div>
                    <div className={styles["contact__faq-item"]}>
                        <Text className={styles["contact__faq-q"]}>What's your return policy?</Text>
                        <Text className={styles["contact__faq-a"]}>
                            We offer free returns within 30 days of delivery on all unworn items.
                        </Text>
                    </div>
                    <div className={styles["contact__faq-item"]}>
                        <Text className={styles["contact__faq-q"]}>Do you ship internationally?</Text>
                        <Text className={styles["contact__faq-a"]}>
                            Yes! We currently ship to over 20 countries worldwide.
                        </Text>
                    </div>
                </div>
            </section>
        </div>
    );
}
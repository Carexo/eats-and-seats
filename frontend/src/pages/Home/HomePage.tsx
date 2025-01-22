import { Button, Row, Col, Typography } from "antd";
import "./HomePage.css";

const { Title, Paragraph } = Typography;

const HomePage = () => {
    return (
        <div className="landing-page">
            <div className="overlay">
                <Row justify="center" align="middle" className="landing-page__content">
                    <Col>
                        <Title level={1} style={{color: "white", textTransform: "uppercase"}}>Eats <span style={{color: "#3e91f7", fontStyle: "italic"}}>&</span> Seats</Title>
                        <Paragraph strong type="secondary" style={{color: "#e6e6e6", fontSize: "20px", padding: "20px"}}>Order your favourite food and book a table in one place!</Paragraph>
                        <Button type="default" size="large"><a href={"/menu"}>Order now</a></Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default HomePage;
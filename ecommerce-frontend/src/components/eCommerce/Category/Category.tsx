import { Link } from 'react-router-dom';
import type { Category } from '../../../types';
//antd
import { Card } from 'antd';
const { Meta } = Card;


interface CategoryProps {
    category: Category;   // أفضل طريقة
}

export default function Category({ category }: CategoryProps) {
    // console.log("Category component received category prop:");
    // console.log(category);
    const { title, prefix, img } = category
    return (
        <>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={
                    <img
                        draggable={false}
                        alt="example"
                        src={img}
                    />
                }
            >
                <Link to={`/categories/products/${prefix}`}>{title}</Link>
                <Meta title={title} description="www.instagram.com" />
            </Card>
        </>
    )
}

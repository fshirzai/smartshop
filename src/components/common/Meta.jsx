import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
  </Helmet>
);

Meta.defaultProps = {
  title: 'Welcome – ShopSmart',
  description: 'Premium electronics & more, delivered fast.',
  keywords: 'electronics, shop, ecommerce',
};

export default Meta;

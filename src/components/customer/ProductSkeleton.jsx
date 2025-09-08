import { Card, Placeholder } from 'react-bootstrap';

const ProductSkeleton = ({ cards = 4 }) => (
  <>
    {[...Array(cards)].map((_, i) => (
      <Card key={i} className="h-100 shadow-sm">
        <Placeholder as={Card.Img} animation="glow" style={{ height: '200px' }} />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />
          </Placeholder>
          <Placeholder.Button variant="dark" className="w-100" />
        </Card.Body>
      </Card>
    ))}
  </>
);

export default ProductSkeleton;

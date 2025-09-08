import { useEffect, useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { categoryAPI } from '../../api/categoryAPI';

const FilterSidebar = ({ onFilter }) => {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    categoryAPI.getCategories().then(({ data }) => setCategories(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ keyword, category, sort, priceRange });
  };

  const reset = () => {
    setKeyword('');
    setCategory('');
    setSort('');
    setPriceRange([0, 1000]);
    onFilter({});
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Search</Form.Label>
            <Form.Control
              placeholder="Keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sort By</Form.Label>
            <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="createdAt">Newest</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Price</Form.Label>
            <Form.Range
              min={0}
              max={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
            <div className="text-muted small">$0 - ${priceRange[1]}</div>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" variant="dark">
              Apply Filters
            </Button>
            <Button type="button" variant="outline-secondary" onClick={reset}>
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterSidebar;

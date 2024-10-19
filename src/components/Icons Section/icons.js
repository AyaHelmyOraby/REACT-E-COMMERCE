

import { Container } from 'react-bootstrap';

const IconSection = () => {
    const icons = [
      // { img: 'free-shipping.png', label: 'Free Shipping' },
      // { img: 'online-order.png', label: 'Online Order' },
      // { img: 'save-money.png', label: 'Save Money' },
      // { img: 'promotions.png', label: 'Promotions' },
      // { img: 'support.png', label: '24/7 Support' },
    ];
  
    return (
      <Container className="text-center my-4">
        <div className="d-flex justify-content-between">
          {icons.map((icon, idx) => (
            <div key={idx} className="text-center">
              <img src={icon.img} alt={icon.label} style={{ width: '50px' }} />
              <p>{icon.label}</p>
            </div>
          ))}
        </div>
      </Container>
    );
  };
  
  export default IconSection;
  
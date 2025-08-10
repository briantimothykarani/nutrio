import { Button, Typography } from '@mui/material';
import { useState, type SetStateAction } from 'react';
import { Link } from 'react-router-dom';

function LandingPagePrice() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan: string | SetStateAction<null>) => {
    setSelectedPlan(plan);
  };

  const plans = [
    {
      name: 'Basic',
      price: '$9.99 / year',
      storage: '10GB Storage',
      emails: '10 Emails',
      domains: '10 Domains',
      bandwidth: '1GB Bandwidth',
      backgroundColor: 'bg-black',
      buttonColor: 'bg-green-600'
    },
    {
      name: 'Pro',
      price: '$24.99 / year',
      storage: '25GB Storage',
      emails: '25 Emails',
      domains: '25 Domains',
      bandwidth: '2GB Bandwidth',
      backgroundColor: 'bg-blue-600',
      buttonColor: 'bg-green-600'
    },
    {
      name: 'Premium',
      price: '$49.99 / year',
      storage: '50GB Storage',
      emails: '50 Emails',
      domains: '50 Domains',
      bandwidth: '5GB Bandwidth',
      backgroundColor: 'bg-purple-600',
      buttonColor: 'bg-green-600'
    },
  ];

  return (
    <div className="flex  justify-center gap-6 p-8">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`border border-solid rounded-lg p-8 w-full sm:w-80 md:w-1/3 shadow-lg transition-transform transform hover:scale-105 ${selectedPlan === plan.name ? 'ring-4 ring-purple-500' : ''} 
                      ${selectedPlan === plan.name ? 'shadow-xl' : 'shadow-md'} hover:shadow-xl`}
          onClick={() => handlePlanSelect(plan.name)} // Handle plan selection
        >
          <div className={`${plan.backgroundColor} text-white p-4 rounded-t-lg text-center`}>
            <Typography variant="h5" component="div" className="font-semibold">
              {plan.name}
            </Typography>
          </div>
          <div className="p-6 text-center border-b text-gray-700">
            <Typography variant="h6">{plan.price}</Typography>
          </div>
          <div className="py-2 text-gray-600">
            <ul className="list-none">
              <li>{plan.storage}</li>
              <li>{plan.emails}</li>
              <li>{plan.domains}</li>
              <li>{plan.bandwidth}</li>
            </ul>
          </div>
          <div className="mt-6">
            <Button
              variant="contained"
              color="primary"
              className={`w-full ${plan.buttonColor} text-white py-3 px-6 rounded-full`}

            ><Link to="/signup" >
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LandingPagePrice;
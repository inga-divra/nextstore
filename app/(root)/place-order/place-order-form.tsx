'use client';
import { Check, Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { createOrder } from '@/lib/actions/order-actions';
import { useRouter } from 'next/navigation';

const PlaceOrderForm = () => {
  const router = useRouter();

  return <>Place order form</>;
};

export default PlaceOrderForm;

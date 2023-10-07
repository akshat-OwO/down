import BilingForm from '@/components/BilingForm';
import { getUserSubscriptionPlan } from '@/lib/stripe';
import { FC } from 'react';

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {

    const subscriptionPlan = await getUserSubscriptionPlan();

  return <BilingForm subscriptionPlan={subscriptionPlan} />
}

export default page
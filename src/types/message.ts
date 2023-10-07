import { AppRouter } from '@/trpc';
import { inferRouterOutputs } from '@trpc/server';

type RouterOutput = inferRouterOutputs<AppRouter>;

type Message = RouterOutput['getFileMessages']['messages'];

type OmitText = Omit<Message[number], 'text'>;

type ExtendedText = {
    text: string | JSX.Element;
};

export type ExtendedMessage = OmitText & ExtendedText;

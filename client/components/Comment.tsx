import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {};

const Comment = (props: Props) => {
  return (
    <div>
      <Card>
        <CardHeader className='p-4 -mb-4'>
          <CardTitle className='flex items-center gap-4'>
            <Avatar>
              <AvatarImage src='/logo.jpg' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className=' font-medium'>Join Mater</span>
            <span className=' text-gray-500 text-sm'>2 days ago</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo dui at justo dignissim sodales. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae;
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comment;

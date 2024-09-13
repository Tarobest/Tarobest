import { View, Button } from "@tarojs/components";
import React, { ReactNode } from 'react'
import "./Button.css";

interface IProps {
  handleClick: () => void;
  children: ReactNode;
}

export default function mybutton(props: IProps) {
  return (
    <View className='buttonBox'>
      <Button onClick={props.handleClick} className='Button'>
        {props.children}
      </Button>
    </View>
  );
}

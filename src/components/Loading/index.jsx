import React from 'react';
import './styles.scss'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Loading() {
    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 40,
            color : 'rgb(219, 76, 63)'
          }}
          spin
        />)

    return (
        <div className='loading-container'>
            <img className='loading-image' src={process.env.PUBLIC_URL + '/todoist-logo.png'} alt='logo-icon'/>
            <Spin indicator={antIcon} />
        </div>
    );
}

export default Loading;
'use client'
import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Logo } from '.';

import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";
import { RiSettings4Fill } from "react-icons/ri";
import Image from 'next/image';

import { FaClosedCaptioning } from "react-icons/fa";
import { RiVoiceprintFill } from "react-icons/ri";
import { LuSplitSquareVertical } from "react-icons/lu";

import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from 'react-router-dom';

import { Mbs } from '../../public/mbs';
import { Minutes } from '../../public/minutes';
import UploadProvider from '../components/UploadProvider';

import AiCaptions from '../pages/aicaptions';
import YouTube from '../pages/youtube';

const { Header, Sider, Content } = Layout;


export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const [megabytes, setMegabyes] = useState()
  const [minutes, setMinutes] = useState()
  const setLimits = async () => {
    setMegabyes(await Mbs())
    setMinutes(await Minutes())
  }
  useEffect(() => {
    setLimits()
  }, [])

  const componentsSwtich = (key) => {
    switch (key) {
      case '1':
        return (<h1>item1</h1>);
      case '2':
        return (<UploadProvider MEGABYTES={megabytes} MINUTES={minutes} />);
      case '3':
        return (<h3>item3</h3>);
      case '4':
        return (<h3>item4</h3>);
      case '5':
        return (<YouTube/>);
      case '6':
        return (<h3>item6</h3>);
      case '7':
        return (<h3>item7</h3>);
      case '8':
        return (<h3>item8</h3>);
      default:
        break;
    }
  };


  return (
    <Router>
      <Layout
        theme={{
          components: {
            Layout: {
              /* here is your component tokens */
              siderBg: "#f1f1f1"
            },
          },
        }}
        className=' w-full h-full '
      >
        <Sider
          width={288}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className='text-[#374151] font-medium bg-white border-r-1 border-[#e5e7eb]'
        >
          {/* Logo */}
          <div className="demo-logo-vertical  flex items-center" >
            <Link href="/" className="max-auto  mx-auto flex items-center">
              <Image src={Logo} alt="Logo" className='' width={80} height={80} />
            </Link>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={selectedMenuItem}
            onClick={(e) => setSelectedMenuItem(e.key)}
            className='bg-transparent text-black p-3'
          >
            <Menu.Item key="1">
              <GoHomeFill className='mr-2' />
              <p>Home</p>
            </Menu.Item>

            <p className='text-md text-[#9ca3af] font-semibold w-[90%] mx-auto mt-7 mb-5'>Tools</p>
            <Menu.Item key="2" className='mt-7'>
              <FaClosedCaptioning className='mr-2' />
              <p>AI Captions</p>
            </Menu.Item>
            <Menu.Item key="3" >
              <RiVoiceprintFill className='mr-2' />
              <p>AI Voiceovers</p>
            </Menu.Item>
            <Menu.Item key="4" >
              <LuSplitSquareVertical className='mr-2' />
              <p>AI Splitscreen Videos</p>
            </Menu.Item>

            <p className='text-md text-[#9ca3af] font-semibold w-[90%] mx-auto mt-7 mb-5'>Downloaders</p>
            <Menu.Item key="5">
              <FaYoutube className='mr-2' />
              <p>Youtube Downloader</p>
            </Menu.Item>
            <Menu.Item key="6">
              <FaInstagram className='mr-2' />
              <p>Instagram Downloader</p>
            </Menu.Item>
            <Menu.Item key="7">
              <FaTiktok className='mr-2' />
              <p>Tiktok Downloader</p>
            </Menu.Item>

            <p className='text-md text-[#9ca3af] font-semibold w-[90%] mx-auto mt-0 opacity-0'>Downloaders</p>
            <Menu.Item key="8" className='mt-7'>
              <RiSettings4Fill className='mr-2' />
              <p>Settings</p>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className=' w-full h-full'>
          <Header className='w-full flex flex-row items-center justify-between bg-white border-b-1 border-[#e5e7eb]' style={{ padding: 0, background: 'colorBgContainer' }}>
            <Button
              className='opacity-0'
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className='flex flex-row gap-x-2 items-center'>
              <UserButton />
              <Link href="/settings" className="max-auto flex flex-row items-center border-0 border-transparent">
                <Button size='sm' isIconOnly color="white" aria-label="Settings">
                  <RiSettings4Fill size={35} color='#953AE7' />
                </Button>
              </Link>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {componentsSwtich(selectedMenuItem)}
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}
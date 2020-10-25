import Link from "next/link";
import { Card, List, Row, Col, Avatar, Button } from "antd";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/customTag.tsx";
import { useQuery } from "@/hooks/useQuery";
import api from "lib/api";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { NextPageContext, NextPage } from "next";
import moment from "moment";
import { useRouter } from "next/router";
import { refresh } from "tocbot";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

const Toc: React.FC = () => {
  const tocRef = useRef<HTMLDivElement>(null);
  const [classname, setClassName] = useState("");
  const [fresh, setRefresh] = useState(false);
  const handleScroll = () => {
    const tocDom = tocRef.current;
    if (tocDom) {
      const tocTop = tocDom.getBoundingClientRect().top;
      const scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (tocTop <= 0) {
        setClassName("fixed");
      } else {
        setClassName("");
      }
    }
  };

  const handleRefresh = () => {
    setRefresh((fresh) => !fresh);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleRefresh);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleRefresh);
    };
  }, []);

  const tocDom = tocRef.current;

  return (
    <div ref={tocRef}>
      <div
        className={classname}
        style={{
          width: tocDom ? tocDom.getBoundingClientRect().width : "auto",
          fontSize: 12,
        }}
      >
        <Card bordered={false} className="toc-info" size="small" >
          <div className="article-toc"></div>
        </Card>
      </div>
    </div>
  );
};

export default Toc;

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
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

const Toc: React.FC = () => {
  const [classname, setClassName] = useState("");
  const tocRef = useRef<HTMLDivElement>(null);
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
      console.log(scrollTop, tocTop);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tocDom = tocRef.current;
  return (
    <div ref={tocRef}>
      <div
        className={classname}
        style={{ width: tocDom ? tocDom.getBoundingClientRect().width : 0 }}
      >
        <Card bordered={false} className="toc-info">
          <div className="article-toc"></div>
        </Card>
      </div>
    </div>
  );
};

export default Toc;

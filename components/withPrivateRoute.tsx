import React from "react";
import Router from "next/router";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import { IState } from "redux/reducer";

const WithPrivateRoute = (WrappedComponent: any) => {
  const hocComponent: NextPage = ({ ...props }) => {
    const { userInfo, isAdmin } = useSelector((state: IState) => state);

    return isAdmin ? <WrappedComponent {...props} /> : <h1>No Auth!!</h1>;
  };

  hocComponent.getInitialProps = async (ctx) => {
    const { store } = ctx;
    const { isAdmin } = store.getState();
    if (WrappedComponent.getInitialProps && isAdmin) {
      const wrappedProps = await WrappedComponent.getInitialProps(ctx);
      return { ...wrappedProps };
    }
  };

  return hocComponent;
};

export default WithPrivateRoute;

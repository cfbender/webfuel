import * as React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <p>
        Lorem ipsum dolor amet snackwave vice PBR&B waistcoat tacos iceland
        prism. Small batch actually fingerstache, echo park YOLO pop-up shaman
        whatever master cleanse kombucha vegan 8-bit bushwick lyft. Ethical
        poutine tofu mustache jianbing heirloom gastropub af fingerstache pabst
        butcher tilde. Mustache bitters listicle, tbh you probably haven't heard
        of them schlitz copper mug tattooed chia squid biodiesel narwhal.
        Tousled shaman farm-to-table fingerstache enamel pin authentic. Truffaut
        taiyaki sustainable heirloom, aesthetic 3 wolf moon iceland meditation
        irony bitters. Cloud bread trust fund squid locavore polaroid organic
        paleo sriracha ramps shoreditch cold-pressed direct trade lomo. Lomo
        XOXO irony knausgaard, kitsch vape mlkshk twee distillery lumbersexual
        forage ethical. Chartreuse leggings try-hard, shaman swag 90's mustache
        vaporware celiac artisan gluten-free messenger bag. Church-key photo
        booth succulents shaman before they sold out vexillologist art party
        gastropub cronut man bun trust fund taxidermy. Hammock godard leggings
        squid, occupy authentic tattooed. VHS literally shaman +1 air plant
        before they sold out meggings activated charcoal. Tote bag before they
        sold out tbh tofu fashion axe woke taiyaki mumblecore pork belly.
      </p>
      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0 auto;
          height: 100%;
        }
        p {
          padding: 50px;
        }
      `}</style>
    </Layout>
  );
};

export default IndexPage;

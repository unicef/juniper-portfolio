import React from "react";
import json2mq from "json2mq";
import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { SideDetails } from "../../common/SideDetails";
import { InvestmentMainText } from "./InvestmentMainText";
import { InvestmentMainImage } from "./InvestmentMainImage";
import { InvestmentObject } from "./InvestmentObject";
import { SelectionCriteria } from "./SelectionCriteria";
import { InvestPageArrow } from "./InvestPageArrow";

const useStyles = makeStyles((theme: any) => ({
  top: {
    backgroundColor: "#0068ea",
    paddingTop: "100px",
    height: "90vh",
  },
  topMobile: {
    backgroundColor: "#0068ea",
    paddingTop: "100px",
  },
}));
export const Invest = () => {
  const classes = useStyles();
  const matches = useMediaQuery(
    json2mq({
      minWidth: 991,
    })
  );
  return (
    <div>
      <div
        className={matches ? classes.top : classes.topMobile}
        style={{
          paddingLeft: "14px",
          paddingRight: "14px",
          // paddingBottom: "14px",
        }}
      >
        <Grid container>
          {matches ? (
            <Grid style={{ paddingBottom: "50px" }} item xs={12} sm={3}>
              <SideDetails
                firstNumber="11"
                firstLabel="investments"
                middleNumber="01 btc"
                middleLabel="bitcoin invested"
                lastNumber="1100 eth"
                lastLabel="ether invested"
              />
            </Grid>
          ) : null}
          <InvestmentMainText />
          {matches ? null : (
            <Grid item xs={12} sm={3}>
              <SideDetails
                firstNumber="11"
                firstLabel="investments"
                middleNumber="01 btc"
                middleLabel="bitcoin invested"
                lastNumber="1100 eth"
                lastLabel="ether invested"
              />
              <div style={{ textAlign: "right", paddingTop: "-10px" }}>
                <InvestmentMainImage />
              </div>
            </Grid>
          )}
        </Grid>
        {matches ? (
          <div style={{ position: "absolute", left: 57, bottom: 48 }}>
            <InvestmentMainImage />
          </div>
        ) : null}
        <Grid
          container
          style={{ position: "absolute", bottom: 96 }}
          alignContent="center"
          alignItems="center"
          justify="center"
        >
          {matches ? <InvestPageArrow /> : null}
        </Grid>
      </div>
      <div>
        <InvestmentObject
          title={"Democratising social impact financing with blockchain"}
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"Atix Labs"}
          detail2={"01 BTC"}
          detail3={"Argentina"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://btc4.trezor.io/tx/001ef6f14df3b63f872c4cbdf7d3f36a15330eb9b9db4983f6c3b6d9093a8924"
          }
          linkToImage={"./Atix.png"}
          altDescription={""}
          color={"#ffd113"}
          fontColor={"#000"}
          linkToProject={
            "https://www.unicef.org/innovation/FundGraduate/Atixlabs"
          }
          time={"08 Oct 2019 17:16 UTC"}
        />
        <SelectionCriteria />
        <InvestmentObject
          title={"Making sensitive clinical data portable, safe and private"}
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"Prescrypto"}
          detail2={"49.5 ETH"}
          detail3={"Mexico"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://etherscan.io/tx/0x63b15553266e673f73315b93f9914a92d8208dfe8fa1d01dc119d156dc33d622"
          }
          linkToImage={"Prescrypto.png"}
          altDescription={""}
          color={"#0068ea"}
          fontColor={"#fff"}
          linkToProject={
            "https://www.unicef.org/innovation/fundgraduate/Prescrypto"
          }
          time={"08 Oct 2019 15:54 UTC"}
        />
        <InvestmentObject
          title={
            "Using blockchain technology to inspire young people to become local changemakers"
          }
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"Utopixar"}
          detail2={"49.5 ETH"}
          detail3={"Tunisia"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
          }
          linkToImage={"./Utopixar.png"}
          altDescription={""}
          color={"#ffd113"}
          fontColor={"#000"}
          linkToProject={
            "https://www.unicef.org/innovation/fundgraduate/Coinsence"
          }
          time={"08 Oct 2019 15:57 UTC"}
        />
        <InvestmentObject
          title={
            "Using a low-cost Interactive Voice Response platform to send key information about COVID-19 in Cambodia"
          }
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"Somleng"}
          detail2={"125 ETH"}
          detail3={"Cambodia"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://etherscan.io/tx/0xea13d93f88bc5cc1c86b0c57e60ef0bd6a6c4446c623acc2622da7fbcbfec3e8"
          }
          linkToImage={"./Somleng.png"}
          altDescription={""}
          color={"#0068ea"}
          fontColor={"#fff"}
          linkToProject={"https://www.somleng.org"}
          time={"18 Jun 2020 08:06 UTC"}
        />
        <InvestmentObject
          title={
            "Using machine learning to facilitate early treatment to infants with neonatal sepsis"
          }
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"Avyantra"}
          detail2={"125 ETH"}
          detail3={"India"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://etherscan.io/tx/0xe7951d7a78fa3581c48b8914c7f2c5737aeeab29989f65763c21bd1fa2134b06"
          }
          linkToImage={"./Avyantra.png"}
          altDescription={""}
          color={"#ffd113"}
          fontColor={"#000"}
          linkToProject={
            "https://www.unicef.org/innovation/stories/avyantra-using-machine-learning-facilitate-early-treatment-infants-neonatal-sepsis"
          }
          time={"18 Jun 2020 07:52 UTC"}
        />

        <InvestmentObject
          title={
            "Improving food and vaccines distribution systems more efficiently through blockchain"
          }
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"StaTwig"}
          detail2={"125 ETH"}
          detail3={"India"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://etherscan.io/tx/0x36a083becc6d49514c4fa8dc61ea398f01be0e681d9b79d640eccbf5bd4d80e4"
          }
          linkToImage={"./StaTwig.png"}
          altDescription={""}
          color={"#0068ea"}
          fontColor={"#fff"}
          linkToProject={"https://statwig.com"}
          time={"18 Jun 2020 07:52 UTC"}
        />
        <InvestmentObject
          title={"Improving children's reading skills using VR technology"}
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"Utopic Studio"}
          detail2={"125 ETH"}
          detail3={"Chile"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://etherscan.io/tx/0x30e928db6a6eb5d88bbdb8c19202308047683be8dd4b4f80fbe49db6c9e56cb9"
          }
          linkToImage={"./UtopicStudio.png"}
          altDescription={""}
          color={"#ffd113"}
          fontColor={"#000"}
          linkToProject={"https://utopicstudio.com"}
          time={"18 Jun 2020 07:41 UTC"}
        />
        <InvestmentObject
          title={
            "Utilizing VR technology to address phobias and social anxieties"
          }
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"Ideasis"}
          detail2={"125 ETH"}
          detail3={"Turkey"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://etherscan.io/tx/0x776e0b64c76f58b7521e4e6de44026cfb6f2aa7186bc127b302544faabf83c5a"
          }
          linkToImage={"./Ideasis.png"}
          altDescription={""}
          color={"#0068ea"}
          fontColor={"#fff"}
          linkToProject={"http://www.ideasis.com.tr"}
          time={"18 Jun 2020 07:57 UTC"}
        />
        <InvestmentObject
          title={
            "Using artificial intelligence to provide access to quality early childhood education"
          }
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"Afinidata"}
          detail2={"125 ETH"}
          detail3={"Guatemala"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://etherscan.io/tx/0x5a20f875d51ec96726ae484e9083cb3a93b0d2ced74692f473f8822b8722f20e"
          }
          linkToImage={"./Afinidata.png"}
          altDescription={""}
          color={"#ffd113"}
          fontColor={"#000"}
          linkToProject={"https://afinidata.com/en/home/"}
          time={"18 Jun 2020 08:06 UTC"}
        />
        <InvestmentObject
          title={
            "Aiding communication for children and adults with speech and language impairments"
          }
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"Cireha"}
          detail2={"125 ETH"}
          detail3={"Argentina"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://etherscan.io/tx/0x5f7fa39683f421dc98b0981feef0573bd805293d38dfdbaa7bcab4438175c3bd"
          }
          linkToImage={"./Cireha.png"}
          altDescription={""}
          color={"#0068ea"}
          fontColor={"#fff"}
          linkToProject={"http://cireha.com.ar"}
          time={"18 Jun 2020 07:50 UTC"}
        />
        <InvestmentObject
          title={
            "Creating data-driven, verified cities through blockchain and AI"
          }
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"OS City"}
          detail2={"125 ETH"}
          detail3={"Mexico"}
          button={"View Project"}
          link={"Transaction Proof"}
          linkToProof={
            "https://etherscan.io/tx/0x7df0ef84451e66e26046bb896c9ea7d4ab589b97c3fa80c080d18d0b3e22be1b"
          }
          linkToImage={"./OS.png"}
          altDescription={""}
          color={"#ffd113"}
          fontColor={"#000"}
          linkToProject={
            "https://www.unicef.org/innovation/stories/one-smart-creating-data-driven-verified-cities-through-blockchain-and-ai"
          }
          time={"18 Jun 2020 07:44 UTC"}
        />
      </div>
    </div>
  );
};

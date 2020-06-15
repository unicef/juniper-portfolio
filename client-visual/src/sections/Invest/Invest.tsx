import React from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { SideDetails } from "../../common/SideDetails";
import { InvestmentMainText } from "./InvestmentMainText";
import { InvestmentMainImage } from "./InvestmentMainImage";
import { InvestmentObject } from "./InvestmentObject";
import json2mq from "json2mq";
import { SelectionCriteria } from "./SelectionCriteria";

const useStyles = makeStyles((theme: any) => ({
  top: {
    backgroundColor: "#0068ea",
    paddingTop: "100px",
  },
}));
export const Invest = () => {
  const classes = useStyles();
  const matches = useMediaQuery(
    json2mq({
      minWidth: 800,
    })
  );
  return (
    <div>
      <div
        className={classes.top}
        style={{ paddingLeft: "14px", paddingRight: "14px" }}
      >
        <Grid container>
          {matches ? (
            <Grid item xs={12} sm={3}>
              <SideDetails
                style={{ paddingBottom: "50px" }}
                firstNumber="12"
                firstLabel="investments"
                middleNumber="01 btc"
                middleLabel="bitcoin invested"
                lastNumber="1225 eth"
                lastLabel="ether invested"
              />
            </Grid>
          ) : null}
          <Grid item xs={12} sm={9}>
            <InvestmentMainText />
          </Grid>
          {matches ? null : (
            <Grid style={{ paddingTop: "50px" }} item xs={12} sm={3}>
              <SideDetails
                firstNumber="12"
                firstLabel="investments"
                middleNumber="01 btc"
                middleLabel="bitcoin invested"
                lastNumber="1225 eth"
                lastLabel="ether invested"
              />
            </Grid>
          )}
          {/* <Grid item xs={12} sm={9}>
                        <InvestmentMainText />
                    </Grid> */}
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <InvestmentMainImage />
          </Grid>
        </Grid>
      </div>
      <div>
        <InvestmentObject
          title={"Democratising social impact financing with blockchain"}
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"Atix Labs"}
          detail2={"1 BTC"}
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
            "Using Blockchain technology to inspire young people to become local changemakers"
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
          //   linkToProof={
          //     "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
          //   }
          linkToImage={"./Somleng.png"}
          altDescription={""}
          color={"#0068ea"}
          fontColor={"#fff"}
          linkToProject={"https://www.somleng.org"}
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
          //   linkToProof={
          // "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
          //   }
          linkToImage={"./Avyantra.png"}
          altDescription={""}
          color={"#ffd113"}
          fontColor={"#000"}
          linkToProject={
            "https://www.unicef.org/innovation/stories/avyantra-using-machine-learning-facilitate-early-treatment-infants-neonatal-sepsis"
          }
        />
        <InvestmentObject
          title={
            "Developing an open-source messaging solution providing connectivity in remote areas"
          }
          label1={"Startup"}
          label2={"Funding Amount"}
          label3={"Country"}
          detail1={"W3 Engineers"}
          detail2={"125 ETH"}
          detail3={"Bangladesh"}
          button={"View Project"}
          link={"Transaction Proof"}
          //   linkToProof={
          //     "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
          //   }
          linkToImage={"./W3.png"}
          altDescription={""}
          color={"#0068ea"}
          fontColor={"#fff"}
          linkToProject={"https://w3engineers.com"}
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
          //   linkToProof={
          //     "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
          //   }
          linkToImage={"./OS.png"}
          altDescription={""}
          color={"#ffd113"}
          fontColor={"#000"}
          linkToProject={
            "https://www.unicef.org/innovation/stories/one-smart-creating-data-driven-verified-cities-through-blockchain-and-ai"
          }
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
          //   linkToProof={
          //     "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
          //   }
          linkToImage={"./StaTwig.png"}
          altDescription={""}
          color={"#0068ea"}
          fontColor={"#fff"}
          linkToProject={"https://statwig.com"}
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
          //   linkToProof={
          //     "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
          //   }
          linkToImage={"./UtopicStudio.png"}
          altDescription={""}
          color={"#ffd113"}
          fontColor={"#000"}
          linkToProject={"https://utopicstudio.com"}
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
          //   linkToProof={
          //     "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
          //   }
          linkToImage={"./Ideasis.png"}
          altDescription={""}
          color={"#0068ea"}
          fontColor={"#fff"}
          linkToProject={"http://www.ideasis.com.tr"}
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
          //   linkToProof={
          //     "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
          //   }
          linkToImage={"./Afinidata.png"}
          altDescription={""}
          color={"#ffd113"}
          fontColor={"#000"}
          linkToProject={"https://afinidata.com/en/home/"}
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
          //   linkToProof={
          //     // "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
          //   }
          linkToImage={"./Cireha.png"}
          altDescription={""}
          color={"#0068ea"}
          fontColor={"#fff"}
          linkToProject={"http://cireha.com.ar"}
        />
      </div>
    </div>
  );
};

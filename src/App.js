import './App.css';
import {NavigationScreenW} from './components/Navigation';
import React, { Component } from 'react';
import {BiLink} from 'react-icons/bi';
import {AiOutlineArrowUp, AiFillFileWord, AiFillFilePdf, AiFillGithub, AiFillFileExcel} from 'react-icons/ai';
import {FiMail, FiPhone} from 'react-icons/fi';
import {IoIosVideocam} from 'react-icons/io';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';
import experience from './modells/experience';
import skills from './modells/skills';
import FlagIcon from './components/Flags';

class App extends Component {
  constructor(){
    super();
    Card = withTranslation()(Card);
    Utbildning = withTranslation()(Utbildning);
    Kompetenser = withTranslation()(Kompetenser);
    Experience = withTranslation()(Experience);
    Footer = withTranslation()(Footer);    
  }
  //observers declarations
  observer = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
      //shows the welcome message
      let welcome= document.getElementById("welcome");
      welcome.classList.toggle("show");
      this.observer.unobserve(entries[0].target);
    }
  });

  newObserver = new IntersectionObserver((entries)=>{
    //controlls the status of the menu icon, showing and hiding it
    if(entries[0].isIntersecting){
      let menuIcon = document.getElementsByClassName("menuIcon")[0];
      
      if(entries[0].target.id === "cardMenuContainer"|| entries[0].target.id === "utbildningContainer"|| entries[0].target.id === "footerContainer"){
        if(!(menuIcon.classList.contains("contrast"))){
          menuIcon.classList.remove("normal");
          menuIcon.classList.add("contrast");
        }
      }else {
        if(!(menuIcon.classList.contains("normal"))){
          menuIcon.classList.remove("contrast");
          menuIcon.classList.add("normal");
        }
      }
    }
  },{
    threshold:0.5
  });

  resizeObserver = new ResizeObserver((event)=>{
    if(event[0].contentRect<510){

    }
  });

  observerFunction={
    observeAll: function(observer,element){
      observer.observe(element)},
    unobserveAll:function(observer,element){
      observer.unobserve(element)}
  }

  componentDidMount(){
    let body = document.getElementById("App-body");
    //activate listeners
    body.addEventListener('scroll', this.handleScroll);
    // activate observers
    this.resizeObserver.observe(body);
    this.observerhandler(this.observerFunction.observeAll);
    const scrollbarWidth = body.offsetWidth - body.clientWidth;
    let menuIcon = document.getElementById("menuIcon");
    menuIcon.style.right =  `${10 + scrollbarWidth}px`;
  }

  observerhandler(observerFunction){
    //variables
    let body = document.getElementById("App-body");
    let utbildning = document.getElementById("utbildningContainer");
    let presentation = document.getElementById("cardMenuContainer");
    let kompetenser = document.getElementById("kompetenserContainer");
    let experience = document.getElementById("experienceContainer");
    let footer = document.getElementById("footerContainer");

    observerFunction(this.observer,body);
    observerFunction(this.newObserver,presentation);
    observerFunction(this.newObserver,utbildning);
    observerFunction(this.newObserver,footer);
    observerFunction(this.newObserver,kompetenser);
    
    let experienceArray = Array.prototype.slice.call(experience.children);
    experienceArray.forEach((experienceSection)=>{
      observerFunction(this.newObserver,experienceSection);
    })
  }

  componentWillUnmount(){
    //unlisten
    let body = document.getElementById("App-body");
    body.removeEventListener('scroll', this.handleScroll);
    //deactivate observers
    this.observerhandler(this.observerFunction.unobserveAll);
    this.resizeObserver.unobserve(body);
  }

  handleScroll(e){
    let body = document.getElementById("App-body");
    let experienceSection = document.getElementById("experienceContainer");
  
    let lastSection = experienceSection.lastChild;
    let lastSectionPosition= lastSection.offsetTop + experienceSection.offsetTop;
    
    if(body.scrollTop>experienceSection.offsetTop && body.scrollTop<=lastSectionPosition){
      let div= document.getElementById("experienceTitleContainer");
      div.style.position = "fixed";
      if(window.innerWidth < 1300 ){
        div.style.top="20px";
      }else{
        div.style.top="0";
      }

    }else if(body.scrollTop>lastSectionPosition){
      let div= document.getElementById("experienceTitleContainer");
      div.style.position = "absolute";
      if(window.innerWidth < 1300 ){
        div.style.top= `calc(${lastSection.offsetTop}px + 20px)`;
      }else{
        div.style.top= `${lastSection.offsetTop}px`;
      }
      

    }else if(body.scrollTop<=experienceSection.offsetTop){
      let div= document.getElementById("experienceTitleContainer");
      div.style.position = "absolute";
    }
  }

  render(){
    return (
      <div id="App">
        <div id="App-body">
           <NavigationScreenW />
          <div id="cardMenuContainer" className="section">
            <div id="welcomeCard">
              <div className="welcomeContainer">
                <h1 id="welcome">{t("welcome")}</h1>
                <FlagIcon/>
              </div>
              <Card/>
            </div>
          </div>
          <div id="utbildningContainer" className="section">
            <Utbildning/>
          </div>
          <div id="kompetenserContainer" className="section">
            <Kompetenser/>
          </div>
          <div id="experienceContainer" >
            <Experience/>
          </div>
          <div id="footerContainer" className="section">
            <Footer/>
          </div>
        </div>
      </div>
    );
  }
}

class Card extends Component {
  render() {
    const t = this.props.t;
    return (
      <div id="card">
        <div id="cardContent">
          <div id="cardPic">
          </div>
          <div id="cardBack">
            <div id="cardInfo">
              <p>{t("card")}</p>
              <div id="signature" >Alberto Nuñez</div>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}

class Utbildning extends Component {
  componentDidMount(){
    let utbildningContainerDiv = document.getElementById("utbildningContainer");
    let observer = new IntersectionObserver(
          entries => {
            let utbildningDiv= document.getElementsByClassName("utbildning")[0];
            utbildningDiv.classList.toggle("show",entries[0].isIntersecting);
              if(entries[0].isIntersecting) {
                observer.unobserve(entries[0].target)};
          },
          {
            threshold:0.5
        });
    observer.observe(utbildningContainerDiv);
  }

  render() {
    return (
      <div id="utbildning" className="utbildning">
        <div id="title">
          <h1>{t("utbildning.title")}</h1>
          <p className="utbildningDescription">{t("utbildning.description")}</p>
        </div>
        <div id="lista">
          <ul>
            {t("utbildning.courses",{ returnObjects: true}).map((course)=><li key={course}>{course}</li>)}
          </ul>
        </div>
      </div>
    )
  }
}

class Kompetenser extends Component{
  constructor(props){
    super(props);
    this.generateKompetenser = this.generateKompetenser.bind(this)
  }

componentDidMount(){
  let kompetenserDiv = document.getElementsByClassName("kompetenser")[0];
  let observer = new IntersectionObserver(
    entries => {
      let knowledgedivs=document.getElementsByClassName("knowledge");
      let knowledgeDivsArray = Array.prototype.slice.call( knowledgedivs );
      knowledgeDivsArray.forEach(div=>div.classList.toggle("show",entries[0].isIntersecting));
      if(entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
      };
    },
    {
      threshold:0.5
  });
  observer.observe(kompetenserDiv);
}

generateKompetenser(){
  function importAll(r) {
    let images = {};
     r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
      return images
    }
    const images = importAll(require.context('./icons', false, /\.(png|jpe?g|svg)$/));
    
    let counterAction=Math.ceil(Object.keys(skills.kompetenser).length/2);
    
    let kompetenser= Object.keys(skills.kompetenser).map((kompetensKey)=>{
    let aktuellKompetens = skills.kompetenser[kompetensKey];
    let style = {
      backgroundImage: `url(${images[aktuellKompetens.icon]})`,
    };
    return (<div className="kompIcon" id={kompetensKey} key={kompetensKey}>
      <div className="icon" style={style}></div>
      <div className="nk">
        <div className="name">{aktuellKompetens.name}</div>
        <div className="knowledgeContainer">
          <div className="knowledge" style={{width: `${aktuellKompetens.knowledge}%`}}></div>
        </div>
      </div>
      
    </div>)
  });
  if(kompetenser.length%2!==0){
    kompetenser.push(<div className="kompIcon" key="dummy"></div>);
  };
  let column1 = React.createElement("div", {className:"column",id:"column1", key:"column1"},kompetenser.slice(0,counterAction));
  let column2 = React.createElement("div", {className:"column",id:"column2", key:"column2"},kompetenser.slice(counterAction,kompetenser.length));
  return [column1,column2];
  }
  render() {
    return(
      <div className="kompetenser">
        <div className="kompetenserContent">
          <div id="kompIcons">
            {this.generateKompetenser()}
          </div>
          <div id="titleContainer">
            <h1>{t("skills.title")}</h1>
            <p className="skillsDescription">{t("skills.description")}</p>
            <div id="fish"></div>
          </div>
        </div> 
      </div>
    )
  }
}

class Experience extends Component{
  componentDidMount(){
    let experienceDivs = document.getElementsByClassName("experienceSectionContainer");
    let observer = new IntersectionObserver(
      entries => {
        if(entries[0].isIntersecting) {
          // let individualExperienceDivs = entries[0].target.getElementsByClassName("experience");
          let h2 = entries[0].target.querySelector(".experienceTitleGhost h2");
          h2.classList.toggle("show",entries[0].isIntersecting);
          observer.unobserve(entries[0].target);
          }
          
        },
      {
        threshold:0.5
    });
    let experienceDivsArray = Array.prototype.slice.call( experienceDivs );
    experienceDivsArray.forEach((div)=>{
      observer.observe(div);
    })
    
  }
  generateErfarenhet(section){
    let icons = {
      link: ()=><BiLink/>,
      word: ()=><AiFillFileWord/>,
      pdf: ()=><AiFillFilePdf/>,
      git: ()=><AiFillGithub/>,
      video: ()=><IoIosVideocam/>,
      excell: ()=><AiFillFileExcel/>
    }
    let projects = section.projects;
    
    let content = Object.keys(projects).map((projectKey)=>{
      
      let links = Object.keys(projects[projectKey].links).map((link)=>{
        return(<a rel="noreferrer" target="_blank" href={projects[projectKey].links[link].address} key={projectKey + link}>
          {icons[projects[projectKey].links[link].type]()}
          {t(`experience.${section.name}.${projectKey}.links.${link}`)}
        </a>)
      });
      let background = require(`./images/${projects[projectKey].background}`);
      
      return(<div className="experience" id={projectKey} key={projectKey}>
        <div className="backgroundContainer"><div className={`background ${projectKey}`} style={{backgroundImage: `url(${background})`}} ></div></div>
        <div className="textContainer">
          <div className= "text">
            <div className="title"><h2>{projects[projectKey].name}</h2></div>
            <div className="description" >{t(`experience.${section.name}.${projectKey}.description`)}</div>
            {console.log(projectKey)}
            {console.log(t(`experience.${section.name}.${projectKey}.content`, { returnObjects: true}))}
            <div className="content"><strong>{t(`experience.${section.name}.${projectKey}.content`, { returnObjects: true}).join(" / ")}</strong></div>
            <div className="lankar">{links}</div>
          </div>
        </div>
        
      </div>)
    })
    let filteredContent = content.filter(object=>object !== null);
    return filteredContent;
  }

  generateExperienceSections(section){
    return (<div className="experienceSectionContainer section" id={section.name} key={section.name}>
      <div className="experienceTitleGhost" ><h2>{t(`experience.${section.name}.name`)}</h2></div>
      <div className="experienceSection">
        <div className="experienceSectionsPuffs" >
        {this.generateErfarenhet(section)}
        </div>
      </div>
    </div>)
  }

  render(){
    return (<>
      <div id="experienceTitleContainer" className="experienceTitleContainer"><div id="experienceTitle"><h1>{t("experience.title")}</h1></div></div>
      {Object.keys(experience).map((section)=>{
        return this.generateExperienceSections(experience[section]);
      })}
    </>)
  }
}

class Footer extends Component{
  render(){
    return(<>
      <footer>
          <h1>{t("footer.contact")}</h1>
          <a title={t("footer.mail.title")} alt={t("footer.mail.alt")} href="mailto:anulo@live.se"><FiMail/> {"  anulo@live.se"}</a>
          <a title={t("footer.phone.title")} alt={t("footer.phone.alt")} href="tel:0046737296127"><FiPhone/> {"  0046 73 72 96 127"}</a>
      </footer>
      <div title= {t("footer.back.title")} alt= {t("footer.back.alt")} id="arrow"><a href="#cardMenuContainer" ><AiOutlineArrowUp/></a></div>
      
    </>)
  }
}

export default withTranslation()(App);
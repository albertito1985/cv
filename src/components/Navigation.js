import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {AiOutlineMenu} from 'react-icons/ai';
import Flags from './Flags';

class Navigation extends Component {
  capitalize(string){
    return string.replace(/^[a-z]/,string[0].toUpperCase());
  }

  render() {
    const t = this.props.t;
    const area={
      presentation: t("navigation.presentation"),
      education: t("navigation.education"),
      skills: t("navigation.skills"),
      experience: t("navigation.experience"),
      contact: t("navigation.contact"),

    }
    return (
        <nav className="navUl">
          <ul>
            <li><a onClick={this.props.navigationScreen && this.props.closeNavigation} title= {t("navigation.scrollTo", {area: area.presentation})} alt={t("navigation.linkTo", {area: area.presentation})} href="#cardMenuContainer">{this.capitalize(area.presentation)}</a></li>
            <li><a onClick={this.props.navigationScreen && this.props.closeNavigation} title= {t("navigation.scrollTo", {area: area.education} )} alt={t("navigation.linkTo", {area: area.education})} href="#utbildningContainer">{this.capitalize(area.education)}</a></li>
            <li><a onClick={this.props.navigationScreen && this.props.closeNavigation} title= {t("navigation.scrollTo", {area: area.skills} )} alt={t("navigation.linkTo", {area: area.skills})} href="#kompetenserContainer">{this.capitalize(area.skills)}</a></li>
            <li><a onClick={this.props.navigationScreen && this.props.closeNavigation} title= {t("navigation.scrollTo", {area: area.experience} )} alt={t("navigation.linkTo", {area: area.experience})} href="#experienceContainer">{this.capitalize(area.experience)}</a></li>
            <li><a onClick={this.props.navigationScreen && this.props.closeNavigation} title= {t("navigation.scrollTo", {area: area.contact} )} alt={t("navigation.linkTo", {area: area.contact})} href="#footerContainer">{this.capitalize(area.contact)}</a></li>
          </ul>  
        </nav>
    )
  }
}

class NavigationScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      active: false
    };
    this.handleClick= this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({active:!this.state.active});
  }
  render(){    
    const t = this.props.t;
    return(<>
    <div className="menuIcon contrast" id="menuIcon" title = {t("navigation.menu.title")} alt={t("navigation.menu.alt")} onClick={this.handleClick}><AiOutlineMenu/></div>
    <div className={`NavigationScreen${(this.state.active)?" active":""}`}>
      <NavigationW navigationScreen={true} closeNavigation={this.handleClick}/>
      <Flags/>
    </div>
    
    </>)
  }
}

const NavigationW = withTranslation()(Navigation);
const NavigationScreenW = withTranslation()(NavigationScreen);

export {NavigationW,NavigationScreenW};

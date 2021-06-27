import React from 'react';
import axios from 'axios'
import {Container, Row, Col} from 'react-bootstrap'
import './App.css';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {lst: []}
  }
  render () {
    let lstRender = this.state.lst.map((item)=>(
      <Row key = {"row"+item.id} className="campaign-header">
        {this.renderItem(item)}
      </Row>
    ))
    return (
      <div className="App">
        <header className="header">
          PLUGS
        </header>
        <Container>
          {lstRender}
        </Container>
      </div>
    );
  }
  componentDidMount() {
    axios.get("https://www.plugco.in/public/take_home_sample_feed", {}).then((res)=>{
      this.setState({lst:res.data.campaigns})
    }, (error) => {
      console.log(error)
    })
  }
  renderItem = (item) => {
    let firstRow = (
      <Row className = "campaign-row-top">
        <Col>
          <img className="cropped-header" alt={item.campaign_name} src={item.campaign_icon_url}/> 
        </Col>
        <Col className="col-no-padding">
          <Row>
            <h2>{item.campaign_name}</h2>
          </Row>
          <Row>
            <h2 className="green"><strong>{item.pay_per_install}</strong> per install</h2>
          </Row>
        </Col>
      </Row>
    )
    let secondRow = (
      <Row>
        {item.medias.map((media)=>{
          return this.setMedia(media)
        })}
      </Row>
    )
    return (
      <div>
        {firstRow}
        {secondRow}
      </div>
    )
  }
  setMedia = (media) => {
    let copyButton = (
      <img src="https://image.flaticon.com/icons/png/512/88/88026.png" alt = "copy" className = "downloadCopy" onClick = {()=>this.copy(media.tracking_link)}/>
    )
    let downloadButton = (
      <img src = "https://cdn.icon-icons.com/icons2/1875/PNG/512/download_120262.png" className="downloadCopy" alt="download" href={media.download_url} onClick = {()=>this.download(media.download_url)}/>
    )
    if (media.media_type === "video") {
      return (<Col className="col-no-padding" key={media.cover_photo_url}>
        <Row>
        <img alt={media.cover_photo_url} className="cropped-png-video" src={media.cover_photo_url}/> 
        </Row>
        <Row className="downloadCopyTop">
          <Col>
          {copyButton}
          </Col>
          <Col>
          {downloadButton}

          </Col>
        </Row>
      </Col>
      )
    }
    else {
      return (
        <Col className="col-no-padding set_size">
          <Row>
          <img alt={media.cover_photo_url} className="cropped-png-photo" src={media.cover_photo_url}/> 
          </Row>
          <Row>
            <Col>
            {copyButton}
            </Col>
            <Col>
            {downloadButton}

          </Col>
        </Row>
        </Col>
       )
    }
  }
  copy = (link) => {
    let e = document.createElement("input")
    e.value = link 
    document.body.appendChild(e);
    e.select();
    document.execCommand("copy");
    document.body.removeChild(e);
  }
  download = (url) => {
    let link = document.createElement("a");
    link.download = true;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


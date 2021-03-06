import React, {Component} from "react";
//import { Link } from 'react-router-dom';
import { Router } from 'react-router';
import "./NewWellFull.css";
//import data from "../../fullDataSetUnformatted.json";
import CsvParse from "../UploadCSV"; 
import { connect } from 'react-redux';
import { login } from '../../actions/auth.js'
import API from "../../utils/API";

const data = JSON.parse(localStorage.getItem('pipeJSON'));

const INITIAL_STATE = {
    metaData:{wellName:'',wellWUID:'',wellLocation:'',Longitude:'',Latitude:'',quickNote:''},
    surveyData:{},
    description:'',
    normSize:'',
    pipeId:'',
    normWeight:'',
    adjustWeight:'',
    grade:'',
    upset:'',
    thread:'',
    normSizeDisabled:true,
    pipeIdDisabled:true,
    normWeightDisabled:true,
    adjustWeightDisabled:true,
    gradeDisabled:true,
    upsetDisabled:true,
    threadDisabled:true,
    canSubmit:true,
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });



    const renderOptions = (state,name) => {
        
          let temp = "<option value=\"undecided\">choose a value</option>";
          switch(name)
          {
              case "description":
                  for(let x in data)
                  { 
                      temp=temp+"<option value=\""+x+"\">"+x+"</option>";
                  }
                  
              break;
  
              case "normSize":
                  if(state["normSizeDisabled"]==false)
                  {   
                          
                      
                      for(let x in data[state.description])
                      {
                          temp=temp+"<option value=\""+x+"\">"+x+"</option>";
                      }
                  
                
                  }
              break;
  
              case "pipeId":
                  if(state["pipeIdDisabled"]==false)
                  {   
                          
                      
                      for(let x in data[state.description][state.normSize])
                      {
                          temp=temp+"<option value=\""+x+"\">"+x+"</option>";
                      }
                  
                
                  }
              break;
              case "normWeight":
                  if(state["normWeightDisabled"]==false)
                  {   
                          
                      
                      for(let x in data[state.description][state.normSize][state.pipeId])
                      {
                          temp=temp+"<option value=\""+x+"\">"+x+"</option>";
                      }
                  
                
                  }
              break;
  
              case "adjustWeight":
                  if(state["adjustWeightDisabled"]==false)
                  {   
                          
                      
                      for(let x in data[state.description][state.normSize][state.pipeId][state.normWeight])
                      {
                          temp=temp+"<option value=\""+x+"\">"+x+"</option>";
                      }
                  
                
                  }
              break;
  
              case "grade":
                  if(state["gradeDisabled"]==false)
                  {   
                          
                      
                      for(let x in data[state.description][state.normSize][state.pipeId][state.normWeight][state.adjustWeight])
                      {
                          temp=temp+"<option value=\""+x+"\">"+x+"</option>";
                      }
                  
                
                  }
              break;
              case "upset":
                  if(state["upsetDisabled"]==false)
                  {   
                          
                      
                      for(let x in data[state.description][state.normSize][state.pipeId][state.normWeight][state.adjustWeight][state.grade])
                      {
                          temp=temp+"<option value=\""+x+"\">"+x+"</option>";
                      }

                  }
                break;
  
              case "thread":
                  if(state["threadDisabled"]==false)
                  {
                      
                      for(let x in data[state.description][state.normSize][state.pipeId][state.normWeight][state.adjustWeight][state.grade][state.upset])
                      {
                          temp=temp+"<option value=\""+x+"\">"+x+"</option>";
                      }
  
                      
                  }
                break;
              default:
              alert("something went wrong: "+ name)
              break;
          }

          return{__html:temp};
  
    }





    

//note for later, change uid to email




class NewWellFull extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }

    
      peaceOutSquirrelScout() {
        this.props.history.push('/my-wells');
        
      }
    
handleSubmit = (state,event,uid) => {
        event.preventDefault();
        let surveyData=state.surveyData
        let temp = data[state.description][state.normSize][state.pipeId][state.normWeight][state.adjustWeight][state.grade][state.upset][state.thread]
        //create objects to pass to database
        let wellProperties = {
            "description":state.description,
            "NorminalSize":state.normSize,
            "pipeInnerDiameter":state.pipeId,
            "norminalWeight":state.norminalWeight,
            "adjustWeight":state.adjustWeight,
            "grade":state.grade,
            "upset":state.upset,
            "thread":state.thread,
        }
        let wellObj = {
            latitude:state.metaData.Latitude,
            longitude:state.metaData.Longitude,
            wellName:state.metaData.wellName,
            wellUWI:state.metaData.wellWUID,
            wellLocation:state.metaData.wellLocation,
            pipeData:{wellProperties:wellProperties,labTestedData:temp},
            surveyData:surveyData,
            comment:state.metaData.comment
        }

        //pass to database
        API.saveWell({
            userId: uid,
            wellData: wellObj

        }).then(response=>{
            //get data and save to session storage.then() redirect to mywells else throw an error
            API.getUserAndWells({uid:uid}).then(response=>
            {sessionStorage.setItem("userData",JSON.stringify(response.data.userData));
            sessionStorage.setItem('wellData',JSON.stringify(response.data.wellData));
            //redirect now
                this.peaceOutSquirrelScout();
            })
            
            
        })

    }

      handleData = data => {
        this.setState(byPropKey('surveyData',data))
        alert('survey data processed');
      }
    
      handleError = error => {
        alert(error);
      }


       handleChange = (state,event) => {


        let name = event.target.name;
        let value = event.target.value;
        {/*have a concept of how to do all this with a for loop*/}
        switch(name)
        {
    
    
            case "description":
            if(value!="undecided")
            {
                
                this.setState({
                    metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                    surveyData:state.surveyData,
                    description:value,
                    normSize:state.normSize,
                    pipeId:state.pipeId,
                    normWeight:state.normWeight,
                    adjustWeight:state.adjustWeight,
                    grade:state.grade,
                    upset:state.upset,
                    thread:state.thread,
                    normSizeDisabled:false,
                    pipeIdDisabled:true,
                    normWeightDisabled:true,
                    adjustWeightDisabled:true,
                    gradeDisabled:true,
                    upsetDisabled:true,
                    threadDisabled:true,
                    canSubmit:true,
                });
            }else{
                this.setState({
                    metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                    surveyData:state.surveyData,
                    description:'',
                    normSize:'',
                    pipeId:'',
                    normWeight:'',
                    adjustWeight:'',
                    grade:'',
                    upset:'',
                    thread:'',
                    normSizeDisabled:true,
                    pipeIdDisabled:true,
                    normWeightDisabled:true,
                    adjustWeightDisabled:true,
                    gradeDisabled:true,
                    upsetDisabled:true,
                    threadDisabled:true,
                    canSubmit:true,
                })
            }
            break;
    
            case "normSize":
            if(value!="undecided")
            {
                
                this.setState({
                    metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                    surveyData:state.surveyData,
                        description:state.description,
                        normSize:value,
                        pipeId:state.pipeId,
                        normWeight:state.normWeight,
                        adjustWeight:state.adjustWeight,
                        grade:state.grade,
                        upset:state.upset,
                        thread:state.thread,
                        normSizeDisabled:false,
                        pipeIdDisabled:false,
                        normWeightDisabled:true,
                        adjustWeightDisabled:true,
                        gradeDisabled:true,
                        upsetDisabled:true,
                        threadDisabled:true,
                        canSubmit:true,
                    });
            }else{
                this.setState({
                    metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                    surveyData:state.surveyData,
                    description:state.description,
                    normSize:'',
                    pipeId:'',
                    normWeight:'',
                    adjustWeight:'',
                    grade:'',
                    upset:'',
                    thread:'',
                    normSizeDisabled:false,
                    pipeIdDisabled:true,
                    normWeightDisabled:true,
                    adjustWeightDisabled:true,
                    gradeDisabled:true,
                    upsetDisabled:true,
                    threadDisabled:true,
                    canSubmit:true,
                })
            }
            break;
    
            case "pipeId":
            if(value!="undecided")
            {
                
                this.setState({
                    metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                    surveyData:state.surveyData,
                    description:state.description,
                    normSize:state.normSize,
                    pipeId:value,
                    normWeight:state.normWeight,
                    adjustWeight:state.adjustWeight,
                    grade:state.grade,
                    upset:state.upset,
                    thread:state.thread,
                    normSizeDisabled:false,
                    pipeIdDisabled:false,
                    normWeightDisabled:false,
                    adjustWeightDisabled:true,
                    gradeDisabled:true,
                    upsetDisabled:true,
                    threadDisabled:true,
                    canSubmit:true,
                })
            }else{
                this.setState({
                    metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                    surveyData:state.surveyData,
                    description:state.description,
                    normSize:state.normSize,
                    pipeId:'',
                    normWeight:'',
                    adjustWeight:'',
                    grade:'',
                    upset:'',
                    thread:'',
                    normSizeDisabled:false,
                    pipeIdDisabled:false,
                    normWeightDisabled:true,
                    adjustWeightDisabled:true,
                    gradeDisabled:true,
                    upsetDisabled:true,
                    threadDisabled:true,
                    canSubmit:true,
                })
            }
            break;
    
            case "normWeight":
                if(value!="undecided")
        {
            this.setState({
                metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                surveyData:state.surveyData,
                description:state.description,
                normSize:state.normSize,
                pipeId:state.pipeId,
                normWeight:value,
                adjustWeight:state.adjustWeight,
                grade:state.grade,
                upset:state.upset,
                thread:state.thread,
                normSizeDisabled:false,
                pipeIdDisabled:false,
                normWeightDisabled:false,
                adjustWeightDisabled:false,
                gradeDisabled:true,
                upsetDisabled:true,
                threadDisabled:true,
                canSubmit:true,
            })
            
        }else{
            this.setState({
                metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                surveyData:state.surveyData,
                description:state.description,
                normSize:state.normSize,
                pipeId:state.pipeId,
                normWeight:'',
                adjustWeight:'',
                grade:'',
                upset:'',
                thread:'',
                normSizeDisabled:false,
                pipeIdDisabled:false,
                normWeightDisabled:false,
                adjustWeightDisabled:true,
                gradeDisabled:true,
                upsetDisabled:true,
                threadDisabled:true,
                canSubmit:true,
            })
        }
            break;
    
            case "adjustWeight":
                if(value!="undecided")
        {
            
            this.setState({
                metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                surveyData:state.surveyData,
                description:state.description,
                normSize:state.normSize,
                pipeId:state.pipeId,
                normWeight:state.normWeight,
                adjustWeight:value,
                grade:state.grade,
                upset:state.upset,
                thread:state.thread,
                normSizeDisabled:false,
                pipeIdDisabled:false,
                normWeightDisabled:false,
                adjustWeightDisabled:false,
                gradeDisabled:false,
                upsetDisabled:true,
                threadDisabled:true,
                canSubmit:true,
            });
        }else{
            this.setState({
                metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                surveyData:state.surveyData,
                description:state.description,
                normSize:state.normSize,
                pipeId:state.pipeId,
                normWeight:state.normWeight,
                adjustWeight:'',
                grade:'',
                upset:'',
                thread:'',
                normSizeDisabled:false,
                pipeIdDisabled:false,
                normWeightDisabled:false,
                adjustWeightDisabled:false,
                gradeDisabled:true,
                upsetDisabled:true,
                threadDisabled:true,
                canSubmit:true,
            })
        }
            break;
    
            case "grade":
                if(value!="undecided")
        {
            
            this.setState({
                metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                surveyData:state.surveyData,
                description:state.description,
                normSize:state.normSize,
                pipeId:state.pipeId,
                normWeight:state.normWeight,
                adjustWeight:state.adjustWeight,
                grade:value,
                upset:state.upset,
                thread:state.thread,
                normSizeDisabled:false,
                pipeIdDisabled:false,
                normWeightDisabled:false,
                adjustWeightDisabled:false,
                gradeDisabled:false,
                upsetDisabled:false,
                threadDisabled:true,
                canSubmit:true,
            })
        }else{
            this.setState({
                metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                surveyData:state.surveyData,
                description:state.description,
                normSize:state.normSize,
                pipeId:state.pipeId,
                normWeight:state.normWeight,
                adjustWeight:state.adjustWeight,
                grade:'',
                upset:'',
                thread:'',
                normSizeDisabled:false,
                pipeIdDisabled:false,
                normWeightDisabled:false,
                adjustWeightDisabled:false,
                gradeDisabled:false,
                upsetDisabled:true,
                threadDisabled:true,
                canSubmit:true,
            })
        }
            break;
    
            case "upset":
                if(value!="undecided")
        {
            
            this.setState({
                metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                surveyData:state.surveyData,                    
                description:state.description,
                normSize:state.normSize,
                pipeId:state.pipeId,
                normWeight:state.normWeight,
                adjustWeight:state.adjustWeight,
                grade:state.grade,
                upset:value,
                thread:state.thread,
                normSizeDisabled:false,
                pipeIdDisabled:false,
                normWeightDisabled:false,
                adjustWeightDisabled:false,
                gradeDisabled:false,
                upsetDisabled:false,
                threadDisabled:false,
                canSubmit:true,});
        }else{
            this.setState({
                metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                surveyData:state.surveyData,
                description:state.description,
                normSize:state.normSize,
                pipeId:state.pipeId,
                normWeight:state.normWeight,
                adjustWeight:state.adjustWeight,
                grade:state.grade,
                upset:'',
                thread:'',
                normSizeDisabled:false,
                pipeIdDisabled:false,
                normWeightDisabled:false,
                adjustWeightDisabled:false,
                gradeDisabled:false,
                upsetDisabled:false,
                threadDisabled:true,
                canSubmit:true,
            })
        }
            break;
    
            case "thread":
                if(value!="undecided")
        {
            
            this.setState({
                metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                surveyData:state.surveyData,
                description:state.description,
                normSize:state.normSize,
                pipeId:state.pipeId,
                normWeight:state.normWeight,
                adjustWeight:state.adjustWeight,
                grade:state.grade,
                upset:state.upset,
                thread:value,
                normSizeDisabled:false,
                pipeIdDisabled:false,
                normWeightDisabled:false,
                adjustWeightDisabled:false,
                gradeDisabled:false,
                upsetDisabled:false,
                threadDisabled:false,
                canSubmit:false,
            });
        }else{
            this.setState({
                metaData:{wellName:state.metaData.wellName,wellWUID:state.metaData.wellWUID,wellLocation:state.metaData.wellLocation,Longitude:state.metaData.Longitude,Latitude:state.metaData.Latitude,quickNote:state.metaData.quickNote},
                surveyData:state.surveyData,
                description:state.description,
                normSize:state.normSize,
                pipeId:state.pipeId,
                normWeight:state.normWeight,
                adjustWeight:state.adjustWeight,
                grade:state.grade,
                upset:state.upset,
                thread:'',
                normSizeDisabled:false,
                pipeIdDisabled:false,
                normWeightDisabled:false,
                adjustWeightDisabled:false,
                gradeDisabled:false,
                upsetDisabled:false,
                threadDisabled:false,
                canSubmit:true,
            })
        }
            break;
    
        default:
        alert('something went wrong in the on change function')
        break;
    
        }
    
        
        
        
    
      }

    render(){
        const {
            metaData,
            surveyData,
            description,
            normSize,
            pipeId,
            normWeight,
            adjustWeight,
            grade,
            upset,
            thread,
            normSizeDisabled,
            pipeIdDisabled,
            normWeightDisabled,
            adjustWeightDisabled,
            gradeDisabled,
            upsetDisabled,
            threadDisabled,
            canSubmit,
        } = this.state;

        const keys = [
            'Depth (ft)',
            'Incl (Deg)',
            'Azim (Deg)',
            'XXXX',
            'XXXX',
            'XXXX',
            'XXXX',
            'XXXX',
            'XXXX',
            'XXXX',
            'XXXX',
            'XXXX',
          ]

        return (
            <div>
                <hr />
                <form onSubmit={(event)=>{this.handleSubmit(this.state,event,this.props.uid)}}>
                    <table style={{"width":"100%"}}>
                        <thead>
                            <tr>
                                <th>Well name</th>
                                <th>Well UWI</th>                                
                                <th>Well Location</th>                                
                                <th>Longitude</th>
                                <th>Latitude</th>
                                <th>Quick Note</th>
                                <th>Upload Survey Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td><input value={metaData.wellName} onChange={event => {let obj=metaData; obj.wellName=event.target.value; this.setState(byPropKey('metaData',obj))}} type="text"  placeholder="enter here" size="20" required /></td>
                            <td><input value={metaData.wellWUID} onChange={event => {let obj=metaData; obj.wellWUID=event.target.value; this.setState(byPropKey('metaData',obj))}} type="text"  placeholder="enter here" size="20" required /></td>
                            <td><input value={metaData.wellLocation} onChange={event => {let obj=metaData; obj.wellLocation=event.target.value; this.setState(byPropKey('metaData',obj))}} type="text"  placeholder="enter here" size="20" required /></td>
                            <td><input value={metaData.Longitude} onChange={event => {let obj=metaData; obj.Longitude=event.target.value; this.setState(byPropKey('metaData',obj))}} type="text"  placeholder="enter here" size="20" required /></td>
                            <td><input value={metaData.Latitude} onChange={event => {let obj=metaData; obj.Latitude=event.target.value; this.setState(byPropKey('metaData',obj))}} type="text"  placeholder="enter here" size="20" required /></td>
                            <td><input value={metaData.quickNote} onChange={event => {let obj=metaData; obj.quickNote=event.target.value; this.setState(byPropKey('metaData',obj))}} type="text"  placeholder="enter here" size="20" required /></td>
                            <td> <CsvParse
                                keys={keys}
                                onDataUploaded={this.handleData}
                                onError={this.handleError}
                                render={onChange => <input type="file" onChange={onChange} />}
                                /></td>
                            </tr>
                        </tbody>
                    </table>
                    <br /> <br />
                    <table style={{"width":"100%"}}>
                        <thead>
                            <tr>{/*literally could have done all this with a for loop*/}
                            <th>Description</th>
                            <th>Norminal Size</th>
                            <th>Pipe Inner Diameter</th>
                            <th>Norminal Weight</th>
                            <th>Adjust Weight</th>
                            <th>Grade</th>
                            <th>Upset</th>
                            <th>Thread</th>
                            <th>Submit</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>{/*literally could have done all this with a for loop*/}
                            <td>
                                <select id="description" name="description" ref="description" onChange={(event)=>this.handleChange(this.state,event)}
                                 dangerouslySetInnerHTML={renderOptions(this.state,"description")} >

                                </select>
                            </td>
                            <td>
                                <select id="normSize" name="normSize" ref="normSize" onChange={(event)=>this.handleChange(this.state,event)}
                                 dangerouslySetInnerHTML={renderOptions(this.state,"normSize")} 
                                 disabled={normSizeDisabled}>
                                 
                                 </select>
                            </td>
                            <td>
                            <select id="pipeId" name="pipeId" ref="pipeId" onChange={(event)=>this.handleChange(this.state,event)}
                                 dangerouslySetInnerHTML={renderOptions(this.state,"pipeId")} 
                                 disabled={pipeIdDisabled}>
                                 
                                 </select>
                            </td>
                            <td>
                            <select id="normWeight" name="normWeight" ref="normWeight" onChange={(event)=>this.handleChange(this.state,event)}
                                 dangerouslySetInnerHTML={renderOptions(this.state,"normWeight")} 
                                 disabled={normWeightDisabled}>
                                 
                                 </select>
                            </td>
                            <td>
                            <select id="adjustWeight" name="adjustWeight" ref="adjustWeight" onChange={(event)=>this.handleChange(this.state,event)}
                                 dangerouslySetInnerHTML={renderOptions(this.state,"adjustWeight")} 
                                 disabled={adjustWeightDisabled}>
                                 
                                 </select>
                            </td>
                            <td>
                            <select id="grade" name="grade" ref="grade" onChange={(event)=>this.handleChange(this.state,event)}
                                 dangerouslySetInnerHTML={renderOptions(this.state,"grade")} 
                                 disabled={gradeDisabled}>
                                 
                                 </select>
                            </td>
                            <td>
                            <select id="upset" name="upset" ref="upset" onChange={(event)=>this.handleChange(this.state,event)}
                                 dangerouslySetInnerHTML={renderOptions(this.state,"upset")} 
                                 disabled={upsetDisabled}>
                                 
                                 </select>
                            </td>
                            <td>
                            <select id="thread" name="thread" ref="thread" onChange={(event)=>this.handleChange(this.state,event)}
                                 dangerouslySetInnerHTML={renderOptions(this.state,"thread")} 
                                 disabled={threadDisabled}>
                                 
                                 </select>
                            </td>
                            <td>
                                <input type="submit" value="submit" disabled={canSubmit} />
                            </td>
                        </tr>
                        </tbody>
                    </table>


                </form>
            </div>
        )
    }

}

const mapStateToProps = (state, props) => ({
    uid: state.auth.uid
});

// const mapDispatchToProps = (dispatch) => ({
//     //pass in well data here
    

// });

export default connect(mapStateToProps, undefined)(NewWellFull);
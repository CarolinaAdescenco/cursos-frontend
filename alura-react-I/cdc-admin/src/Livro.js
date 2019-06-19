import React, { Component } from 'react';
import $ from 'jquery';
import InputCustom from './components/InputCustom';
import BtnSubmitCustom from './components/BtnSubmitCustom';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';


class FormularioLivro extends Component{

  constructor(props){
     super(props);
     this.state = { titulo:'', preco:'', autorId:''};
     this.enviaForm = this.enviaForm.bind(this);
     this.setTitulo = this.setTitulo.bind(this);
     this.setPreco = this.setPreco.bind(this);
     this.setAutorId = this.setAutorId.bind(this);
 }

 enviaForm(evento){
     evento.preventDefault();  
     console.log(this);  
     $.ajax({
         url:'http://cdc-react.herokuapp.com/api/livros',
         contentType:'application/json',
         dataType:'json',
         type:'post',
         data: JSON.stringify({titulo:this.state.titulo,preco:this.state.preco,autorId:this.state.autorId}),
         success: function(novaListagem){
         PubSub.publish('atualiza-lista-livros',novaListagem);
         this.setState({titulo:'',preco:'',autorId:''});
         }.bind(this),
         error: function(resposta){
             if(resposta.status === 400){
                 new TratadorErros().publicaErros(resposta.responseJSON);
             }                 
         }, 
         beforeSend:function(){
             PubSub.publish("limpa-erros", []);
         }    
     });
 }

 setTitulo(evento){
     this.setState({titulo:evento.target.value});
 }

 setPreco(evento){
     this.setState({preco:evento.target.value});
 }

 setAutorId(evento){
     this.setState({autorId:evento.target.value});
 }

 render(){
     return(
         <div className="pure-form pure-form-aligned">
             <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>

               <InputCustom id="titulo" type="text" name="titulo"   value={this.state.titulo}   onChange={this.setTitulo}   label = "Título"/>
               <InputCustom id="preco"  type="text" name="preco"    value={this.state.preco}    onChange={this.setPreco}    label = "Preço"/>

                 <div className="pure-control-group">
                     <label htmlFor="autorId">Autor</label> 
                         <select value={this.state.autorId} name="autorId" onChange={this.setAutorId}>
                             <option value="">Selecione o autor</option>
                             {
                                 this.props.autores.map(function(autor){
                                     return <option value={autor.id}>{autor.nome}</option>;
                                 })
                             }
                         </select>             

                 </div>
                 
                <BtnSubmitCustom label="Salvar"/>

             </form> 
         </div>    
     );
 }
}

class TabelaLivros extends Component {

 render(){
     return(
         <div>            
             <table className="pure-table">
               <thead>
                 <tr>
                   <th>Título</th>
                   <th>Preço</th>
                   <th>Autor</th>
                 </tr>
               </thead>
               <tbody>                    
                   {
                     this.props.lista.map(function(livro){
                       return(
                         <tr key = {livro.id}>
                           <td>{livro.titulo}</td>
                           <td>{livro.preco}</td>
                           <td>{livro.autor.nome}</td>
                         </tr>
                       );
                     })
                    }              

               </tbody>
             </table> 
         </div> 
     );
 }

}


export default class LivroBox extends Component{

 constructor(){
     super();
     this.state = {lista : [], autores:[]};

 }

 componentWillMount(){
     $.ajax({
         url:'http://cdc-react.herokuapp.com/api/livros',
         dataType:'json',
         success:function(resposta){

             this.setState({lista:resposta});
         }.bind(this)
     });


     $.ajax({
         url:'http://cdc-react.herokuapp.com/api/autores',
         dataType: 'json',
         success:function(resposta){
             this.setState = ({autores:resposta});
         }.bind(this)
     });


     PubSub.subscribe('atualiza-lista-livros', function(topico,lista){
         this.setState({lista:lista});
     }.bind(this));    

 }  

 render(){
     return(
         <div>
             <div id="main">
                 <div className="header">
                     <h1>Cadastro de Livros</h1>            
                 </div>        
                 <div className="content" id="content">
                     <FormularioLivro autores={this.state.autores} />
                     <TabelaLivros lista={this.state.lista}/>
                 </div>
             </div>                
         </div>
     );
 }
}
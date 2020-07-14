class QuestionContainer extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = {
        questions: [], 
        text: ''
      };
    }
    
     handleChange = (event) => {
       const { name, value } = event.target;
       this.setState({ [name]: value })
     };
    
    handleDelete = (questionId) => {
      this.setState(prevState => ({
        questions: prevState.questions.filter(q => q.id !== questionId)
      }))
    }
      
    handleSubmit = (event) => {
      event.preventDefault()
      if (this.state.text.length === 0) {
        return
      };
        
      const newQuestion = {
        text: this.state.text,
        id: Date.now()
      };
        
      this.setState(prevState => ({
        questions: prevState.questions.concat(newQuestion),
        text: ''
      }))
    };
    
      render() {
        return (
        <div>
          <div className='container'>
            <div className='row d-flex flex-nowrap' style={{overflowX: 'scroll'}}>
              <DisplayQuestion
                handleDelete={this.handleDelete}
                questions={this.state.questions}
              />
            </div>
          </div>
            
          <div className='container'>
            <div className='form-group'>
              <form onSubmit={this.handleSubmit}>
              <label htmlFor='inputText'>
                  Question Bank
              </label>
                <input
                  type='text'
                  id="inputText"
                  className='form-control'
                  onChange={this.handleChange}
                  name="text"
                  value={this.state.text}
                  />
                <button type='submit' className='btn btn-primary btn-sm'>
                    Add
                </button>
              </form>
            </div>
          </div>
        </div>
         )
      }
   }
          
  class DisplayQuestion extends React.Component {
  
      render() {
        return(
            <>
            {this.props.questions.map(question => (
              <div className='col-sm' style={{minWidth: '240px', cursor: 'pointer' }}>
                <div className='card'>
                  <div className='card-body'>
                    <p key={question.id}>{question.text}</p>
                    <button className='btn btn-primary btn-sm' onClick={()=>this.props.handleDelete(question.id)}>
                       Remove
                    </button>
                  </div>
                </div>
               </div>
                 ))}
            </>
            
        )
      }
    }
  
  
  ReactDOM.render(<QuestionContainer />, document.getElementById('root'));
  
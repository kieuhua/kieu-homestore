import React, {Component} from 'react'

export class PaginationButtons extends Component {
    
    // source
    getPageNumbers = () => {
        if (this.props.pageCount < 4) {
            return [...Array(this.props.pageCount + 1).keys()].slice(1);
        } else if (this.props.currentPage <= 4) {     
            return [1, 2, 3, 4, 5];
        } else  if (this.props.currentPage > this.props.pageCount - 4) {
            return [...Array(5).keys()].reverse()
            .map(v => this.props.pageCount - v);
        } else {
            return [this.props.currentPage -1, this.props.currentPage,
                this.props.currentPage + 1];
        }        
    } 
        
        render() {
            const current = this.props.currentPage;
            const pageCount = this.props.pageCount;
            const navigate = this.props.navigate;

            //console.log("PaginationButton current: " + current)     
           //console.log("PaginationButton pageCount: " + pageCount)     
            
            return <React.Fragment>
            {/* if current=1, then disable Previous button */}
            <button onClick={ () => navigate(current - 1)} 
            disabled={current === 1}  className="btn btn-secondary mx-1">Previous</button>
            
            {/* if current is greater 4, then generate button='1' and '...'*/}
            { /*current > 4 &&
                <React.Fragement>
               <button onClick={() => navigate(1)} 
                className="btn btn-secondary mx-1" >1</button> 
                <span>...</span>
                </React.Fragement> */
            }
            {/* if not sure ???*/}
            {this.getPageNumbers().map(num =>
                <button onClick={() => navigate(num)} key={ num}
                className={`btn mx-1 ${num === current ? "btn-primary": "btn-secondary"}`}> {num}</button>
                )}
                {/* if current is small then lastpage - 4, then generate button='101' */}
                { current <= (pageCount - 4) && 
                    <React.Fragment>
                    <span className="h4">...</span>
                    <button onClick={() => navigate(pageCount)}
                    className="btn btn-secondary mx-1">{ pageCount }</button>
                    </React.Fragment>
                }
                <button onClick={() => navigate(current +1)} disabled={ current === pageCount}
                className="btn btn-secondary mx-1">Next</button>
                </React.Fragment>
            }
        }
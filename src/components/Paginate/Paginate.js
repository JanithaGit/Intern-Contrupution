/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/24/20
 * Time: 7:12 PM
 */
import React from 'react';
import ReactPaginate from 'react-paginate';
import './Paginate.scss';
import {Container} from "reactstrap";
import { FcNext } from 'react-icons/fa';

const Paginate = (props) => {
    return (
        <section className="section paginaton-section">
            <Container>
                <ReactPaginate

                    previousLabel={'<'}
                    nextLabel= {'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    initialPage={props.initialPage}
                    onPageChange={props.handlePageClick}
                    containerClassName={`pagination custom-paginate ${props.className}`}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    disableInitialCallback={props.disableInitialCallback}
                />
            </Container>
        </section>
    )
};
export default Paginate;

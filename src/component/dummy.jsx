import React from 'react'

const dummy = () => {
  return (
    <div>
        <div className='row'>
            <div className='col-lg-6 p-3'>
                <h6><span className='fw-bolder'>Fri 17</span>|Day</h6>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h2 className='fw-bolder m-0 me-3'>26 <sup>o</sup>C</h2>
                        <img width="50px" className='img-fluid' src={icon} alt="icon" />
                    </div>
                    <div className='fs-5 d-flex justify-content-center align-items-center'>
                    <MdDewPoint />
                                            <span className='ms-1 me-3'>W9km/h</span>
                    <MdDewPoint/>

                    </div>

                </div>
                <p>Generally clear. High 26°C. Winds W and variable.</p>
                <div className='card p-3'>
                <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <MdDewPoint className='fs-3 me-2'/>
                            <div>

                            <span className='fw-bold'>Humiditsssy</span>
                            <h5 className='fw-bolder'>44%</h5>
                            </div>
                        </div>
                       
                        <div className='d-flex justify-content-between align-items-center'>
                            <MdDewPoint className='fs-3 me-2'/>
                            <div>

                            <span className='fw-bold'>Humiditsssy</span>
                            <h5 className='fw-bolder'>44%</h5>
                            </div>
                        </div>
                       
                    </div>
                    <hr/>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <MdDewPoint className='fs-3 me-2'/>
                            <div>

                            <span className='fw-bold'>Humiditsssy</span>
                            <h5 className='fw-bolder'>44%</h5>
                            </div>
                        </div>
                       
                        <div className='d-flex justify-content-between align-items-center'>
                            <MdDewPoint className='fs-3 me-2'/>
                            <div>

                            <span className='fw-bold'>Humiditsssy</span>
                            <h5 className='fw-bolder'>44%</h5>
                            </div>
                        </div>
                       
                    </div>

                </div>
            </div>
            {/* <div className='col-lg-6'>
                <h6><span className='fw-bolder'>Fri 17</span>|Day</h6>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className=''>
                        <h2 className='fw-bolder '>26 <sup>o</sup>C</h2>
                        <img className='w-50' src={icon} alt="icon" />
                    </div>
                    <div>
                    <MdDewPoint/>
                                            <p>W9km/h</p>

                    </div>

                </div>
                <p>Generally clear. High 26°C. Winds W and variable.</p>
                <div className='card'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <MdDewPoint/><span>Humidity</span>
                            <h5 className='fw-bolder'>44%</h5>
                        </div>
                        <div>
                            <MdDewPoint/><span>Humidity</span>
                            <h5 className='fw-bolder'>44%</h5>
                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <MdDewPoint/><span>Humidity</span>
                            <h5 className='fw-bolder'>44%</h5>
                        </div>
                        <div>
                            <MdDewPoint/><span>Humidity</span>
                            <h5 className='fw-bolder'>44%</h5>
                        </div>

                    </div>

                </div>
            </div> */}

        </div>
    </div>
  )
}

export default dummy
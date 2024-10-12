import React from 'react';

class CleanupButton extends React.Component {
    handleClick = () => {
        fetch('http://localhost:8080/api/cleanup', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        return (
            <button onClick={this.handleClick} className='bg-[#953AE7] hover:bg-[#953AE7]/60 text-white p-4 mt-5 rounded-full'>
                Clear
            </button>
        );
    }
}

export default CleanupButton;

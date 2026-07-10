import styled from 'styled-components';

const ConfirmDelete = ({ product, heading, deleteCallback, deleteBoxRef, loading, closeDeleteBox }) => {
	console.log("loading:", loading);
	return (
		<StyledWrapper>
			<div className="card" ref={deleteBoxRef}>
				<div className="card-content text-xs">
					<p className="card-heading">{heading}</p>
					<p className="card-description"><span className='font-bold'>{
						product?.title || 'This variant'
					}</span> will be permanently removed from your store.</p>
				</div>

				<div className="card-button-wrapper">
					<button
						className="card-button secondary"
						onClick={closeDeleteBox}
					>
						Cancel
					</button>

					<button
						onClick={deleteCallback}
						disabled={loading !== ''}
						className="card-button primary">
						{
							loading === '' ? 'Delete' : 'Deleting...'
						}
					</button>
				</div>
			</div>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
  .card {
    width: 300px;
    height: fit-content;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    position: relative;
    box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.068);
  }
  .card-content {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .card-heading {
    font-size: 20px;
    font-weight: 700;
    color: rgb(27, 27, 27);
  }
  .card-description {
    font-weight: 100;
    font-size: 14px;
    color: black;
  }
  .card-button-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .card-button {
    width: 50%;
    height: 35px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
  }
  .primary {
    background-color: rgb(255, 114, 109);
    color: white;
  }
  .primary:hover {
    background-color: rgb(255, 73, 66);
  }
  .secondary {
    background-color: #ddd;
  }
  .secondary:hover {
    background-color: rgb(197, 197, 197);
  }`

export default ConfirmDelete;
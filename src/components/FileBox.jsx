import fileLogo from '../assets/fileIcon.png';
import consts from '../Constants';
const FileBox = ({ fileProps }) => {

    let now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    now = null;

    const { name = '', isSender = true, size = 0, ext = '' } = fileProps;
    return (
        <div style={{
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isSender ? 'flex-end' : 'flex-start',
            margin: '.3rem'
        }} >
            <div className=' bg-gray-300 rounded-md'>
                <div className='main-file-container bg-gray-400'>
                    <div className='icon-container'>
                        <div >
                            <img src={fileLogo} alt="fileIcon" width={30} />
                        </div>
                    </div>
                    <div className='text-div-container'>
                        <div className='file-name-container font-semibold'>
                            <div>{name}</div>
                        </div>
                        <div className='lower-icons-container'>
                            <div className='size'>{size}</div>
                            <div className='ext'>{ext}</div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className='time'>{`${currentHour}:${currentMinute}`}</div>
                </div>
            </div>
        </div>
    )
};

export default FileBox;

export const getFile = ( extraProps ) => {
    return {
        type:consts.FILE_TYPE,
        ...extraProps
    }
};
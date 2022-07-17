import Modal from '../../ModalTemplate';
import NicknameItem from './NicknameItem';

function ModalNickname({ members }) {
    return (
        <Modal>
            <h2 className='text-center text-xl font-semibold border-b border-gray-600 pb-2'>
                Nicknames
            </h2>
            <ul className='h-[360px] w-96 overflow-auto flex flex-col gap-2 mt-4'>
                {members.map((member) => (
                    <NicknameItem key={member.uid} member={member} />
                ))}
            </ul>
        </Modal>
    );
}

export default ModalNickname;

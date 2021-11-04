
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import googleIconImg from '../assets/images/google-icon.svg';
import logoImg from '../assets/images/logo.png';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/auth.scss';



export  function Home() {
    const history = useHistory();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
           await signInWithGoogle();
        }
        history.push('/rooms/new')  
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exist');
            return;
        }

        if (roomRef.val().closedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`rooms/${roomCode}`);
    }

    return (
        <div id="page-auth">
            <main>
                <div className="main-content">
                    <Link to ="/">
                        <img src={logoImg} alt="ask" />
                    </Link>
                    <strong>Crie salas e faça perguntas ao seu professor ao-vivo</strong>
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
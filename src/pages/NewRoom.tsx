import { Link, useHistory } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import '../styles/auth.scss';
import { database } from '../services/firebase';

export  function NewRoom() {
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const [newRoomSubtitle, setNewRoomSubtitle] = useState('');
    const history = useHistory();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        if (newRoomSubtitle.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            subtitle: newRoomSubtitle,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <main>
                <div className="main-content">
                    <Link to ="/">
                        <img src={logoImg} alt="ask" />
                    </Link>
                    <strong>Crie salas e faça perguntas ao seu professor ao-vivo</strong>
                    <h2>Criar uma nova sala</h2>
                   
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <input 
                            type="text" 
                            placeholder="Diciplina da sala"
                            onChange={event => setNewRoomSubtitle(event.target.value)}
                            value={newRoomSubtitle}
                        />
                        <Button type="submit">
                           Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
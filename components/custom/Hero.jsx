"use client"
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, { useContext, useState } from 'react'
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Container from './Container';
import SectionBadge from './SectionBadge';
import Icons from './Icons';
import Wrapper from './Wrapper';
import Footer from '@/components/custom/Footer'

function Hero() {
    const [userInput, setUserInput] = useState();
    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)
    const router = useRouter();
    const onGenerate = async (input) => {
        if (!userDetail?.name) {
            setOpenDialog(true);
            return;
        }
        if (userDetail?.token < 10) {
            toast(Lookup.NOT_ENOUGH_TOKENS_TEXT);
            return;
        }
        const msg = {
            role: 'user',
            content: input
        }
        setMessages(msg);

        const workspaceId = await CreateWorkspace({
            user: userDetail._id,
            messages: [msg]
        });
        console.log(workspaceId);
        router.push('/workspace/' + workspaceId);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents new line
            if (userInput.trim() !== '') {
                onGenerate(userInput);
            }
        }
    };

    const perks = [
        {
            icon: Icons.auth,
            title: "Regístrate",
            info: "Crea tu cuenta gratuita para comenzar con Nerd.Lat.",
        },
        {
            icon: Icons.customize,
            title: "Genera",
            info: "Describe tu idea y deja que la IA cree tu sitio web.",
        },
        {
            icon: Icons.launch,
            title: "Lanza",
            info: "Publica tu sitio web y compártelo con el mundo.",
        },
    ];

    const features = [
    {
        icon: Icons.bolt,
        title: "Creación Instantánea",
        info: "Genera tu sitio web en minutos con la potencia de la IA de Nerd.Lat.",
    },
    {
        icon: Icons.palette,
        title: "Diseño Personalizado",
        info: "Modifica el estilo de tu web con opciones flexibles y sin complicaciones.",
    },
    {
        icon: Icons.seo,
        title: "Optimización SEO",
        info: "Tu sitio estará optimizado automáticamente para destacar en buscadores.",
    },
    {
        icon: Icons.monitor,
        title: "Adaptado a Todos los Dispositivos",
        info: "Tu web se verá increíble en computadoras, tablets y móviles sin esfuerzo.",
    },
    {
        icon: Icons.shop,
        title: "Compatible con E-Commerce",
        info: "Añade una tienda en línea fácilmente y comienza a vender en segundos.",
    },
    {
        icon: Icons.server,
        title: "Hosting Seguro y Rápido",
        info: "Tu web estará alojada en servidores seguros y de alto rendimiento.",
    },
];



    return (
        <div className='w-full relative flex flex-col items-center mt-16 justify-center gap-2 p-10'>

            <Wrapper>
                <Container>
                    <div className="flex flex-col items-center justify-center py-10 h-full">
                        <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
                            <span>
                                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                            </span>
                            <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
                            <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/40"></span>
                            <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1.5">
                                <Image src="/sparkles-dark.svg" alt="✨" width={24} height={24} className="w-4 h-4" />
                                <p className="pr-2">Nerd.Lat</p>
                            </span>
                        </button>

                        <div className="flex flex-col items-center mt-8 max-w-3xl w-11/12 md:w-full">
                            <h1 className="text-4xl lg:text-5xl md:!leading-snug font-semibold text-center bg-clip-text bg-gradient-to-b from-gray-50 to-gray-50 text-transparent">
                                {Lookup.HERO_HEADING}
                            </h1>
                            <p className="text-base md:text-lg text-foreground/80 mt-6 text-center">
                                {Lookup.HERO_DESC}
                            </p>
                        </div>

                    </div>

                    
                </Container>
            </Wrapper>

            <div className='p-5 border rounded-xl max-w-xl w-full'
                style={{
                    backgroundColor: Colors.BACKGROUND
                }}>
                <div className='flex gap-2 '>
                    <textarea 
                        placeholder={Lookup.INPUT_PLACEHOLDER}
                        onChange={(event) => setUserInput(event.target.value)}
                        onKeyDown={handleKeyDown}
                        className='outline-none bg-transparent w-full h-32 max-h-56 resize-none'
                    />
                    {userInput?.length > 0 && <ArrowRight
                        onClick={() => onGenerate(userInput)}
                        className='bg-[#008d78] p-2 h-10 w-10 rounded-md cursor-pointer' />}
                </div>
                <div>
                    <Link className='h-5 w-5' />
                </div>
            </div>

            <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3'>
                {Lookup?.SUGGSTIONS.map((suggestion, index) => (
                    <h2 key={index}
                        onClick={() => onGenerate(suggestion)}
                        className='p-1 px-2 border rounded-full text-sm
                    text-gray-400 hover:text-white cursor-pointer'
                    >{suggestion}</h2>
                ))}
            </div>

            <SignInDialog 
                openDialog={openDialog}
                closeDialog={(v) => setOpenDialog(v)} 
            />

            <Wrapper>
                <Container className="mt-56">
                <div className="max-w-md mx-auto text-start md:text-center">
                    <SectionBadge title="El Proceso" />
                    <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                        Tres pasos para crear la web de tus sueños
                    </h2>
                    <p className="text-muted-foreground mt-6">
                        Convierte tu visión en realidad en solo 3 simples pasos
                    </p>
                </div>
            </Container>
            <Container>
                    <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full divide-x-0 md:divide-x divide-y md:divide-y-0 divide-[#071f1b] first:border-l-2 lg:first:border-none first:border-[#071f1b]">
                            {perks.map((perk) => (
                                <div key={perk.title} className="flex flex-col items-start px-4 md:px-6 lg:px-8 lg:py-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <perk.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-medium mt-4">
                                        {perk.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-start lg:text-start">
                                        {perk.info}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Wrapper>

            <Wrapper className="flex flex-col items-center justify-center py-12 relative">
                <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-[rgb(49,206,182)] rounded-full blur-[10rem] -z-10"></div>
                {/* <div className="hidden md:block absolute bottom-0 -left-1/3 w-72 h-72 bg-[rgb(49,206,182)] rounded-full blur-[10rem] -z-10"></div> */}
                <Container>
                    <div className="max-w-md mx-auto text-start md:text-center">
                        <SectionBadge title="Funciones" />
                        <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                            Descubre nuestras potentes herramientas
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            Nerd.Lat te ayuda a crear una página web impresionante en cuestión de segundos con IA.
                        </p>
                    </div>
                </Container>
                <Container>
                    <div className="flex items-center justify-center mx-auto mt-8">
                        <Image src="/lentes.svg" alt="lentes" width={200} height={80}/>
                    </div>
                </Container>
                <Container>
                    <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex flex-col items-start lg:items-start px-0 md:px-0">
                                    <div className="flex items-center justify-center">
                                        <feature.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-medium mt-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-start lg:text-start">
                                        {feature.info}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Wrapper>

        <Footer />
        </div>
    )
}

export default Hero
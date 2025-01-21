import { Metadata } from 'next';
import Layout from '../../layout/layout';


interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'CheckIn-Time',
    description: 'Check in-out of Emplpyee',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    metadataBase: new URL('https://edl.edl.com.la'), 
    openGraph: {
        type: 'website',
        title: 'EDL CheckIn',
        url: 'https://edl.edl.com.la',
        description: 'E-office EDL Laos',
        images: ['https://res.cloudinary.com/dp3zeejct/image/upload/v1690474394/Payment/EDLHQ_mcifks.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}

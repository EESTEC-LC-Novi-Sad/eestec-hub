import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { auth } from "../../auth";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const libreBaskerville = localFont({
	src: [
		{
			path: "./fonts/LibreBaskerville-Regular.ttf",
			variable: "--font-libre-baskerville",
		},
	],
});

export const metadata = {
	title: "EESTEC Hub",
	description: "Made for and by EESETC LC Novi Sad",
};

export default async function RootLayout({ children }) {
	const session = await auth();
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} antialiased`}
			>
				<div className="relative min-h-screen overflow-x-hidden">
					<Header session={session} />
					{children}
				</div>
			</body>
		</html>
	);
}

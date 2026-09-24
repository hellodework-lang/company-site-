import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received contact request:', body);
    
    // Here we would typically save to a database (e.g. Postgres / MongoDB)
    // and send an email notification.
    
    return NextResponse.json({ success: true, message: 'Message received successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

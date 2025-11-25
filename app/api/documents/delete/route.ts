import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const documentId = body.id;

        if (!documentId) {
            return NextResponse.json(
                { error: 'Missing document ID' },
                { status: 400 }
            );
        }

        // Delete the document (chunks will be deleted automatically via cascade)
        const { error } = await supabase
            .from('documents')
            .delete()
            .eq('id', documentId);

        if (error) {
            console.error('Error deleting document:', error);
            return NextResponse.json(
                { error: 'Failed to delete document', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Document deleted successfully',
        });
    } catch (error) {
        console.error('Error in document deletion:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

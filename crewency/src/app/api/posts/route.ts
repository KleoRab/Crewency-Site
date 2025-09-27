import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, this would be a real database
let posts = [
  {
    id: '1',
    content: 'Excited to share our latest product update! 🚀',
    platforms: ['linkedin', 'twitter'],
    scheduledFor: '2024-01-20T10:00:00Z',
    status: 'scheduled',
    createdAt: '2024-01-15T09:00:00Z',
    userId: '1',
    organizationId: 'org1',
  },
  {
    id: '2',
    content: 'Behind the scenes: Our team working on the next big thing!',
    platforms: ['facebook', 'instagram'],
    scheduledFor: '2024-01-21T14:30:00Z',
    status: 'scheduled',
    createdAt: '2024-01-15T10:30:00Z',
    userId: '1',
    organizationId: 'org1',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const platform = searchParams.get('platform');
    const userId = searchParams.get('userId');

    let filteredPosts = posts;

    if (status) {
      filteredPosts = filteredPosts.filter(post => post.status === status);
    }

    if (platform) {
      filteredPosts = filteredPosts.filter(post => post.platforms.includes(platform));
    }

    if (userId) {
      filteredPosts = filteredPosts.filter(post => post.userId === userId);
    }

    return NextResponse.json({
      success: true,
      data: filteredPosts,
      total: filteredPosts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, platforms, scheduledFor, userId, organizationId } = body;

    if (!content || !platforms || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPost = {
      id: (posts.length + 1).toString(),
      content,
      platforms,
      scheduledFor: scheduledFor || new Date().toISOString(),
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      userId,
      organizationId: organizationId || 'org1',
    };

    posts.push(newPost);

    return NextResponse.json({
      success: true,
      data: newPost,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, content, platforms, scheduledFor, status } = body;

    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    posts[postIndex] = {
      ...posts[postIndex],
      content: content || posts[postIndex].content,
      platforms: platforms || posts[postIndex].platforms,
      scheduledFor: scheduledFor || posts[postIndex].scheduledFor,
      status: status || posts[postIndex].status,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: posts[postIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    posts.splice(postIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

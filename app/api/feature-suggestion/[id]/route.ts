import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if the user is authenticated and is an admin
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const data = await request.json()
    const { status } = data

    // Validate the input
    if (!status) {
      return NextResponse.json({ success: false, message: "Status is required" }, { status: 400 })
    }

    // Update the suggestion status
    const updatedSuggestion = await prisma.featureSuggestion.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({
      success: true,
      suggestion: updatedSuggestion,
    })
  } catch (error) {
    console.error("Error updating suggestion:", error)
    return NextResponse.json({ success: false, message: "Failed to update suggestion" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if the user is authenticated and is an admin
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Delete the suggestion
    await prisma.featureSuggestion.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Suggestion deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting suggestion:", error)
    return NextResponse.json({ success: false, message: "Failed to delete suggestion" }, { status: 500 })
  }
}

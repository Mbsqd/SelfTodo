# Base image for .NET runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Build image for .NET and Node.js
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy .NET project files
COPY ["SelfTodo.Server/SelfTodo.Server.csproj", "SelfTodo.Server/"]
RUN dotnet restore "./SelfTodo.Server/SelfTodo.Server.csproj"

# Copy all files and set working directory
COPY . .
WORKDIR "/src/SelfTodo.Server"

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Build .NET project
RUN dotnet build "./SelfTodo.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish .NET project
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./SelfTodo.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Build client application with Vite
FROM build AS client-build
WORKDIR /src/SelfTodo.Client

# Install client dependencies and build
RUN npm install
RUN npm run build

# Final image
FROM base AS final
WORKDIR /app

# Copy .NET application
COPY --from=publish /app/publish .

# Copy built client files
COPY --from=client-build /src/SelfTodo.Client/dist /app/wwwroot

ENTRYPOINT ["dotnet", "SelfTodo.Server.dll"]

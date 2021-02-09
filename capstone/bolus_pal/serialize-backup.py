class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    # handles the manual creation of a new token
    def get_token(self, obj):
        # manual creation of new token to add to user field
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj) # payload is the data being tokenized, in this case the user
        token = jwt_encode_handler(payload)
        return token

    # determines how object being serialized gets saved to the DB
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    # indicate which model each serializer will be representing and which fields we want the serializer to include
    class Meta:
        model = User
        fields = ('token', 'username', 'password')
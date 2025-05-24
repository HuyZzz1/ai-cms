ccred=\033[0;31m
ccyellow=\033[0;33m
ccend=\033[0m

SERVER_IP = 103.95.197.123
DEPLOY_BRANCH = develop

deploy_production: print_detail exec_deploy_cmd clean


print_detail:
	@echo "...${ccred}PRODUCTION DEPLOY${ccend}..."

exec_deploy_cmd:
	@echo "...${ccyellow}Pushing to PRODUCTION SERVER server${ccend}..."
	@git push origin ${DEPLOY_BRANCH}
	@echo "...${ccyellow}Connecting SERVER server${ccend}..."
	@ssh ubuntu@${SERVER_IP} -t "source .nvm/nvm.sh \
		&& source .profile \
		&& source .bashrc \
		&& nvm use 20 \
		&& cd ~/projects/admin  \
		&& git pull origin ${DEPLOY_BRANCH} \
		&& yarn install \
		&& yarn build \
		&& exit"
	@echo "...${ccred}Deploy WEBISTE PRODUCTION done${ccend}..."
	@echo "${ccred}==============================${ccend}"

clean:
	@echo "${ccyellow}Deploy done${ccend}"
